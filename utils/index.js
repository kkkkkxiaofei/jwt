const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const decode = value => jwt.decode(value);

const sign = (payload, serectOrPrivateKey = SECRET) => jwt.sign(payload, serectOrPrivateKey);

module.exports = {
  decode,
  sign
};