import pino from 'pino';

const {
	LOG_LEVEL = 'info',
	DISABLE_LOGGING = false,
	SERVICE_NAME = 'api-template',
} = process.env;

const logger = pino({
	name: SERVICE_NAME,
	level: LOG_LEVEL,
	enabled: !DISABLE_LOGGING,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
	// Example of a list of items/properties to redact (remove) from logging
	// redact: ['password', 'passwordHash', 'newPassword', 'oldPassword'],
	timestamp: true,
});

export default logger;
