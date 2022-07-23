import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyEnvPlugin from '@fastify/env';
import ajv from '../config/ajv';
import ENV_SCHEMA from '../config/env';

type ENV = 'development' | 'staging' | 'testing' | 'production';

type EnvSchema = {
	SERVICE_NAME: string;
	NODE_ENV: ENV;
	APP_ENV: ENV;
	REDIS_URL: string;
	LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
	DISABLE_LOGGING: boolean;
	HOST: string;
	PORT: number;
};

declare module 'fastify' {
	interface FastifyInstance {
		env: EnvSchema;
		config: Record<string, string | number | boolean> & EnvSchema;
	}
}

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
