import { FastifyInstance } from 'fastify';
import { bootstrap } from '../lib/server';

jest.setTimeout(30000);

describe('server', () => {
	describe('plugins', () => {
		let server: FastifyInstance;
		beforeAll(async () => {
			server = await bootstrap();
			await server.ready();
		});

		test('registers config plugin', async () => {
			expect(server.config).toBeTruthy();
		});

		test('registers cache plugin', async () => {
			expect(server.cache).toBeTruthy();
		});
	});
});
