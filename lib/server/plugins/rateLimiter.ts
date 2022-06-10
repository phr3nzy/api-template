import fastifyPlugin from 'fastify-plugin';
import fastifyRateLimitPlugin from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';

async function rateLimiter(fastify: FastifyInstance) {
	await fastify.register(fastifyRateLimitPlugin, {
		cache: 10000,
		whitelist: ['127.0.0.1', 'localhost'],
		skipOnError: true,
		redis: fastify.cache,
	});
}

export default fastifyPlugin(rateLimiter, {
	name: 'rateLimiter',
	dependencies: ['config', 'cache'],
});
