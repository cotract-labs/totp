import totp from "totp-generator";
import isBase32 from "./is-base32";

export const generateTOTP = (key: string, options ?: TOTPOptions, timestamp: Date = new Date()) =>
    new TOTP(key, options).generate(timestamp);

export const validateTOTP = (key: string, code: string, options ?: TOTPOptions, timestamp: Date = new Date()) =>
    new TOTP(key, options).validate(code, timestamp);

export interface TOTPOptions {
    period?: number;
    maxSteps?: number;
    algorithm?: "SHA-1"     | "SHA-224"   | "SHA-256"  | "SHA-384"  | "SHA-512" |
                "SHA3-224"  | "SHA3-256"  | "SHA3-384" | "SHA3-512" |
                "SHAKE128"  | "SHAKE256"  |
                "cSHAKE128" | "cSHAKE256" |
                "KMAC128"   | "KMAC256";
    digits?: number;
}

class TOTP {
    private key: string;
    period: number;
    maxSteps: number;
    algorithm: string;
    digits: number;

    constructor(
        key: string,
        options?: TOTPOptions
    ) {
        const {
            period = 60,
            maxSteps = 2,
            algorithm = "SHA-1",
            digits = 8,
        }: TOTPOptions = options || {};

        if (!isBase32(key)) {
            throw new Error("key must be a balid base32 encoded string (A-Z, 2-7, =)")
        }

        this.key = key;
        this.period = period;
        this.maxSteps = maxSteps;
        this.algorithm = algorithm;
        this.digits = digits;
    }

    generate(timestamp: Date = new Date()) {
        return totp(
            this.key,
            {
                period: this.period,
                algorithm: this.algorithm,
                digits: this.digits,
                timestamp: timestamp.getTime(),
            }
        );
    }

    validate(code: string, timestamp: Date = new Date()) {
        let newTimestamp;
        for (let index = -this.maxSteps; index <= this.maxSteps; index++) {
            const diff = index * this.period * 1000;
            newTimestamp = new Date(timestamp.getTime() - diff);

            const newCode = this.generate(newTimestamp);
            if (code === newCode) {
                return true;
            }
        }

        return false;
    }
}

export default TOTP;
