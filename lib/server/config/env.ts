const ENV_SCHEMA = {
	type: 'object',
	required: ['SERVICE_NAME', 'REDIS_URL'],

	properties: {
		SERVICE_NAME: {
			type: 'string',
		},
		NODE_ENV: {
			type: 'string',
			enum: ['development', 'testing', 'staging', 'production'],
			default: 'production',
		},
		APP_ENV: {
			type: 'string',
			enum: ['development', 'testing', 'staging', 'production'],
			default: 'production',
		},
		LOG_LEVEL: {
			type: 'string',
			enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
			default: 'info',
		},
		DISABLE_LOGGING: {
			type: 'boolean',
			default: false,
		},
		HOST: {
			type: 'string',
			default: '0.0.0.0',
		},
		PORT: {
			type: 'integer',
			default: 3000,
		},
		REDIS_URL: {
			type: 'string',
			format: 'uri',
		},
	},
};

export default ENV_SCHEMA;
