import pino from 'pino';

const {
	LOG_LEVEL = 'info',
	DISABLE_LOGGING = false,
	NODE_ENV = 'development',
	SERVICE_NAME = 'api-template',
} = process.env;

const logger = pino({
	name: SERVICE_NAME,
	level: LOG_LEVEL,
	enabled: !DISABLE_LOGGING,
	prettyPrint: NODE_ENV === 'development',
	timestamp: true,
});

export default logger;
