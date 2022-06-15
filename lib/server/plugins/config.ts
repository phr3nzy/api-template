import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyEnvPlugin from '@fastify/env';
import ajv from '../config/ajv';
import ENV_SCHEMA from '../config/env';

async function config(fastify: FastifyInstance) {
	// Load environment variables according to schema
	await fastify.register(fastifyEnvPlugin, {
		schema: ENV_SCHEMA,
		confKey: 'env',
		dotenv: true,
		ajv,
	});

	// Add config to server context
	fastify.decorate('config', {
		...fastify.env,
	});
}

export default fastifyPlugin(config, {
	name: 'config',
});
