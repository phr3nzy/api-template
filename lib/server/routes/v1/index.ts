import { FastifyInstance } from 'fastify';
import spec from './index.spec.json';

export default async function RegisterV1Routes(fastify: FastifyInstance) {
	fastify.route({
		method: 'GET',
		url: '/',
		schema: spec.schema,
		handler: async (_, __) => {
			return { success: true, message: 'Success!' };
		},
	});
}
