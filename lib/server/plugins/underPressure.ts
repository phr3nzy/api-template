import fastifyPlugin from 'fastify-plugin';
import underPressureFastifyPlugin from '@fastify/under-pressure';
import { FastifyInstance } from 'fastify';

async function underPressure(fastify: FastifyInstance) {
	await fastify.register(underPressureFastifyPlugin, {
		exposeStatusRoute: {
			routeOpts: {
				logLevel: fastify.config.LOG_LEVEL,
			},
			url: '/health',
		},
		healthCheck: async function (fastifyInstance) {
			try {
				await fastifyInstance.cache.set('connection_test', 'true', 'EX', 3);
				const cacheIsAlive = await fastifyInstance.cache.get('connection_test');

				if (cacheIsAlive) {
					return true;
				}

				return false;
			} catch (error) {
				fastify.log.error(error);

				return false;
			}
		},
		healthCheckInterval: 5000, // Every 5 seconds
	});
}

export default fastifyPlugin(underPressure, {
	name: 'underPressure',
	dependencies: ['config', 'cache'],
});
