import TOTP from '../totp';

// Thu Jun 09 2022 17:34:09 GMT+0200 (Central European Summer Time)
const date = new Date(1654788849882);

describe('generate', () => {
    test('generates valid code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.generate(date)).toBe('05027737');
    });
});

describe('validate', () => {
    test('returns true for current code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('05027737', date)).toBe(true);
    });

    test('returns true for one period old code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('79829104', date)).toBe(true);
    });

    test('returns true for two periods old code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('19187703', date)).toBe(true);
    });

    test('returns false for three periods old code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('54057823', date)).toBe(false);
    });

    test('returns true for one period newer code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('35511625', date)).toBe(true);
    });

    test('returns true for two periods newer code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('15887734', date)).toBe(true);
    });

    test('returns false for three periods newer code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('80776693', date)).toBe(false);
    });

    test('returns false for invalid code', () => {
        const totp = new TOTP('AAAAAAAA');
        expect(totp.validate('99999999', date)).toBe(false);
    });
});
