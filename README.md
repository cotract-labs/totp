# Time-based One-time Password (TOTP)

Super simple wrapper around `totp-generator`.

## Getting started

```
npm install --save cotract-labs/totp
```

## Usage

```ts
import TOTP from '../totp';

const secretKey = 'AAAAAAAA'; // Base32 encoded string
const totp = new TOTP(secretKey);

const code = totp.generate(); // 59631047
totp.validate(code); // true
```

You can also use the function equvialents if you don't want to use a class.

```ts
import { generateTOTP, validateTOTP } from '../totp';

const key = 'AAAAAAAA';
const code = generateTOTP(key); // 59631047
validateTOTP(key, code); // true
```

With all options and their default values

```ts
import TOTP from '../totp';

const secretKey = 'AAAAAAAA'; // Base32 encoded string
const totp = new TOTP(secretKey, {
    period: 60,
    maxSteps: 2,
    algorithm: "SHA-1",
    digits: 8,
});
```
