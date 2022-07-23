import fastifyPlugin from 'fastify-plugin';
import underPressureFastifyPlugin from '@fastify/under-pressure';
import { FastifyInstance } from 'fastify';

async function underPressure(fastify: FastifyInstance) {
	await fastify.register(underPressureFastifyPlugin, {
		maxEventLoopDelay: 3000,
		maxEventLoopUtilization: 0.8,
		exposeStatusRoute: {
			routeOpts: {
				logLevel: fastify.config.LOG_LEVEL,
			},
			routeResponseSchemaOpts: {
				status: { type: 'string', default: 'ok' },
				metrics: {
					type: 'object',
					properties: {
						eventLoopDelay: { type: 'number' },
						rssBytes: { type: 'number' },
						heapUsed: { type: 'number' },
						eventLoopUtilized: { type: 'number' },
					},
				},
			},
		},
		healthCheck: async function (fastifyInstance) {
			try {
				await fastifyInstance.cache.set('connection_test', 'true', 'EX', 3);
				const cacheIsAlive = await fastifyInstance.cache.get('connection_test');

				if (cacheIsAlive) {
					return { status: 'ok', metrics: fastify.memoryUsage() };
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
