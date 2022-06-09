import isBase32 from './../is-base32';

test('invalid isBase32 strings returns false', () => {
    expect(isBase32('buren')).toBe(false);
});

test('valid isBase32 strings returns true', () => {
    expect(isBase32('AAAAAAAA')).toBe(true);
});
