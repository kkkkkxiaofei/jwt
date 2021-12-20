const { decode, sign } = require('../utils');
const { ID_TOKEN } = require('../config');

const payload = decode(ID_TOKEN);
const idToken = sign(payload);

console.log(payload);
console.log(payload === idToken);