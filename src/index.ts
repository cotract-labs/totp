import totp, { generateTOTP as generate, validateTOTP as validate } from './totp';

export const generateTOTP = generate;
export const validateTOTP = validate;
export default totp;
