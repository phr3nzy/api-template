import fastify from 'fastify';
import path from 'path';
import fastifySensible from '@fastify/sensible';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import configPlugin from './plugins/config';
import fastifyHelmet from '@fastify/helmet';
import cachePlugin from './plugins/cache';
import fastifyStaticPlugin from '@fastify/static';
import rateLimiterPlugin from './plugins/rateLimiter';
import underPressurePlugin from './plugins/underPressure';
import routes from './routes';
import ajv from './config/ajv';
import { FastifyRequest } from 'fastify';
import { v4 as uuid } from 'uuid';
import qs from 'qs';
import logger from './config/logger';

function genReqId(_: FastifyRequest) {
	return uuid();
}

async function bootstrap() {
	// Initialize the server
	const server = fastify({
		trustProxy: true,
		logger,
		ignoreTrailingSlash: true,
		genReqId,
		querystringParser: (str: string) =>
			qs.parse(str, {
				allowPrototypes: false,
				charset: 'utf-8',
				charsetSentinel: true,
				parseArrays: false,
				interpretNumericEntities: true,
				parameterLimit: 5,
				strictNullHandling: true,
				plainObjects: false,
			}),
	});

	// Use a custom schema validator
	server.setValidatorCompiler(({ schema }) => {
		return ajv.compile(schema);
	});

	// Standardize HTTP error responses
	await server.register(fastifySensible);

	// Request-scoped asynchronous storage
	await server.register(fastifyRequestContextPlugin, {
		defaultStoreValues: {
			account: null,
		},
	});

	// Load environment variables and configuration options
	await server.register(configPlugin);

	// Sane default HTTP headers
	// TODO: use correct typings for swaggerCSP
	await server.register(fastifyHelmet, (instance: any) => {
		return {
			contentSecurityPolicy: {
				directives: {
					...fastifyHelmet.contentSecurityPolicy.getDefaultDirectives(),
					'form-action': ["'self'"],
					'img-src': ["'self'", 'data:', 'validator.swagger.io'],
					'script-src': ["'self'"].concat(instance.swaggerCSP.script),
					'style-src': ["'self'", 'https:'].concat(instance.swaggerCSP.style),
				},
			},
		};
	});

	// Load Cache client
	await server.register(cachePlugin);

	// Enable static file serving
	await server.register(fastifyStaticPlugin, {
		root: path.join(__dirname, 'static'),
	});

	// Enable healthchecks
	await server.register(underPressurePlugin);

	// Enable rate-limiter
	await server.register(rateLimiterPlugin);

	// Register server routes
	await server.register(routes);

	return server;
}

export { bootstrap };
