import fastify, { FastifyInstance } from 'fastify';
import fastifySensible from '@fastify/sensible';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import configPlugin from './plugins/config';
import fastifyHelmet from '@fastify/helmet';
import underPressurePlugin from './plugins/underPressure';
import routes from './routes';
import ajv from './config/ajv';
import SERVER_CONFIG from './config/server';
import swagger from './plugins/swagger';
import fastifyStatic from '@fastify/static';
import path from 'path';

async function bootstrap() {
	// Initialize the server
	const server = fastify(SERVER_CONFIG);

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

	// API Documentation using Swagger
	await server.register(swagger);

	// Serve static assets
	await server.register(fastifyStatic, {
		root: path.join(__dirname, 'static'),
		serve: true,
	});

	const getHelmetDirectives = (instance: FastifyInstance) => {
		const defaultDirectives =
			fastifyHelmet.contentSecurityPolicy.getDefaultDirectives();
		return server.config.NODE_ENV === 'production' &&
			server.config.APP_ENV === 'production'
			? defaultDirectives
			: {
					...defaultDirectives,
					'form-action': ["'self'"],
					'img-src': ["'self'", 'data:', 'validator.swagger.io'],
					'script-src': ["'self'"].concat(instance.swaggerCSP.script),
					'style-src': ["'self'", 'https:'].concat(instance.swaggerCSP.style),
			  };
	};

	// Sane default HTTP headers
	await server.register(fastifyHelmet, instance => {
		return {
			contentSecurityPolicy: {
				directives: getHelmetDirectives(instance),
			},
		};
	});

	// Enable healthchecks
	await server.register(underPressurePlugin);

	// Register server routes
	await server.register(routes);

	return server;
}

export { bootstrap };
