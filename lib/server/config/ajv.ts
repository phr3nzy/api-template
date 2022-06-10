import Ajv from 'ajv';
import applyErrors from 'ajv-errors';
import applyFormats from 'ajv-formats';

const ajv = new Ajv({
	allErrors: true,
	removeAdditional: true,
	useDefaults: true,
	coerceTypes: true,
});

applyFormats(ajv);
applyErrors(ajv);

export default ajv;
