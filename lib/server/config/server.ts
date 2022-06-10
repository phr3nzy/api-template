import { FastifyRequest } from 'fastify';
import { v4 as uuid } from 'uuid';
import PINO_CONFIG from './logger';
import qs from 'qs';

function genReqId(_: FastifyRequest) {
	return uuid();
}

const SERVER_CONFIG = {
	trustProxy: true,
	logger: PINO_CONFIG,
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
};

export default SERVER_CONFIG;
