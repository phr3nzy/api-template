import 'make-promises-safe';
import { bootstrap } from './server';

/**
 * Starts the API Service
 */
async function start() {
	try {
		// Bootstrap the server
		const server = await bootstrap();

		// Catch and log any errors that occur during plugin registration
		await server.ready();

		// Start listening for requests
		await server.listen({ host: server.config.HOST, port: server.config.PORT });
		server.log.debug(server.printRoutes());
	} catch (error) {
		// Log uncaught startup errors
		console.error(error);
	}
}

start();
