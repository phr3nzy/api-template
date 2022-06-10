import { FastifyInstance as DefaultFastifyInstance } from 'fastify';
import { Redis } from 'ioredis';

type ENV = 'development' | 'staging' | 'testing' | 'production';

declare module 'fastify' {
	interface FastifyInstance extends DefaultFastifyInstance {
		env: {
			SERVICE_NAME: string;
			NODE_ENV: ENV;
			APP_ENV: ENV;
			REDIS_URL: string;
			LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
			DISABLE_LOGGING: boolean;
			HOST: string;
			PORT: number;
		};
		config: {
			SERVICE_NAME: string;
			NODE_ENV: ENV;
			APP_ENV: ENV;
			REDIS_URL: string;
			LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
			DISABLE_LOGGING: boolean;
			HOST: string;
			PORT: number;
		};
		cache: Redis;
		swaggerCSP: {};
	}
}
