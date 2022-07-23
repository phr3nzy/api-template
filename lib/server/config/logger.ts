import pino from 'pino';

const {
	LOG_LEVEL = 'info',
	DISABLE_LOGGING = false,
	SERVICE_NAME = 'api-template',
	NODE_ENV = 'development',
} = process.env;

const logger = pino({
	name: SERVICE_NAME,
	level: LOG_LEVEL,
	enabled: !DISABLE_LOGGING,
	transport:
		NODE_ENV === 'development'
			? {
					target: 'pino-pretty',
					options: { color: true },
			  }
			: (null as any),
	// Example of a list of items/properties to redact (remove) from logging
	// redact: ['password', 'passwordHash', 'newPassword', 'oldPassword'],
	timestamp: true,
});

export default logger;
