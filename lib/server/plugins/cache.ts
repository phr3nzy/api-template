import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import IORedis from 'ioredis';
import { parseRedisUrl } from 'parse-redis-url-simple';

async function cache(fastify: FastifyInstance) {
	const [parsedUrl] = parseRedisUrl(fastify.config.REDIS_URL);
	if (!parsedUrl) {
		throw new Error(
			`Plugin error: cannot parse redis url. Value: ${
				fastify.config.REDIS_URL || null
			}`,
		);
	}

	const redis = new IORedis({
		enableAutoPipelining: true,
		...parsedUrl,
		tls: fastify.config.REDIS_URL.startsWith('rediss')
			? {
					rejectUnauthorized: false,
					requestCert: false,
			  }
			: {},
		reconnectOnError: err => {
			fastify.log.error('Reconnect on error', err);

			const targetError = 'READONLY';

			if (err.message.slice(0, targetError.length) === targetError) {
				// Only reconnect when the error starts with "READONLY"
				return true;
			}

			return false;
		},

		retryStrategy: times => {
			fastify.log.error(`Retrying to connect....${times}`);

			// Stop retrying after 6 times
			if (times >= 6) {
				return undefined;
			}

			return Math.min(times * 50, 2000);
		},
	});

	fastify.decorate('cache', redis);
}

export default fastifyPlugin(cache, {
	name: 'cache',
	dependencies: ['config'],
});
