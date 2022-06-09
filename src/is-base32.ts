const isBase32 = (value: string): boolean =>
    value.length % 8 === 0 && /^[A-Z2-7]+=*$/.test(value);

export default isBase32;