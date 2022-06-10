import { FastifyInstance } from 'fastify';
// TODO: fix .json imports
import spec from './index.spec.json';

export default function RegisterV1Routes(fastify: FastifyInstance, _: {}) {
	fastify.route({
		method: 'GET',
		url: '/',
		schema: spec.schema,
		handler: async (request, reply) => {
			return { success: true, message: 'Success!' };
		},
	});
}
