const fs = require('fs');
const path = require('path');
const { decode, sign, verify, rawVerify } = require('../utils');
const { ID_TOKEN } = require('../config');


const decodedIdToken = decode(ID_TOKEN, { complete: true });
// const idToken = sign(decodedIdToken.payload);

// console.log(decodedIdToken);
// console.log(ID_TOKEN === idToken);
// console.log(decode(idToken, { complete: true }));

const pem = fs.readFileSync(path.resolve('./public.pem'));
// console.log(Buffer.from(pem, 'base64').toString());
// console.log(verify(ID_TOKEN, pem));


console.log(rawVerify(ID_TOKEN, pem));