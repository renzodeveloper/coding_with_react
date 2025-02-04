import crypto from 'crypto';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length),
    randomUUID: () => crypto.randomBytes(16).toString('hex'),
  }
});
