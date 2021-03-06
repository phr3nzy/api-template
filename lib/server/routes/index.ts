import { FastifyInstance } from 'fastify';
import RegisterV1Routes from './v1';

export default async function RegisterRoutes(fastify: FastifyInstance) {
	await fastify.register(RegisterV1Routes, { prefix: 'v1' });
}
