import { Redis } from 'ioredis';

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
		config: {} & EnvSchema;
		cache: Redis;
		swaggerCSP: {
			script: string[];
			style: string[];
		};
	}
}
