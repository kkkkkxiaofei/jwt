const fs = require('fs');
const path = require('path');
const { decode, sign, verify, rawVerify: verifySignature, rawDecode } = require('../utils');
const { ID_TOKEN } = require('../config');

// 1. decode
const decodedIdToken = decode(ID_TOKEN, { complete: true });
console.log(decodedIdToken);

// 2. raw decode
console.log(rawDecode(ID_TOKEN));

// 3. verify all
const pem = fs.readFileSync(path.resolve('./public.pem'));
console.log(verify(ID_TOKEN, pem));

// 4. verify signature in raw way
console.log(verifySignature(ID_TOKEN, pem));

// 5.
// const idToken = sign(decodedIdToken.payload);

