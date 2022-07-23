import fastifySwagger from '@fastify/swagger';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

async function swagger(fastify: FastifyInstance, _: unknown) {
	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'API Template Documentation',
				description: 'Swagger Spec for API Template',
				version: '1.0',
			},
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [],
		},
		routePrefix: '/docs',
		mode: 'dynamic',
		exposeRoute:
			fastify.config.NODE_ENV !== 'production' &&
			fastify.config.APP_ENV !== 'production',
	});
}

export default fastifyPlugin(swagger, {
	name: 'swagger',
	dependencies: ['config'],
});
