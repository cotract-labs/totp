# Time-based One-time Password (TOTP)

Super simple wrapper around `totp-generator`.

## Getting started

```
npm install --save cotract-labs/totp
```

## Usage

```ts
const secretKey = 'AAAAAAAA'; // Base32 encoded string
const totp = new TOTP(secretKey);

const code = totp.generate();
// 59631047

totp.validate(code);
// true
```

With all options and their default values

```ts
const secretKey = 'AAAAAAAA'; // Base32 encoded string
const totp = new TOTP(secretKey, {
    period: 60,
    maxSteps: 2,
    algorithm: "SHA-1",
    digits: 8,
});
```
