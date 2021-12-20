const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const decode = (value, options = {}) => jwt.decode(value, options);

const sign = (payload, serectOrPrivateKey = SECRET) => 
  jwt.sign(payload, serectOrPrivateKey, {algorithm: 'RS256'});

const verify = (token, secretOrPublickKey) => new Promise((resolve, reject) => {
  jwt.verify(token, secretOrPublickKey, {
    ignoreExpiration: true, 
  }, (error, decoded) => {
    if (error) {
      reject(error);
    } else {
      resolve(decoded);
    }
  });
});

const rawVerify = (jws, secretOrPublickKey) => {
  const thing = jws.split('.', 2).join('.');
  const signature = jws.split('.')[2];
  var verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(thing);
  return verifier.verify(secretOrPublickKey, signature, 'base64');
};

module.exports = {
  decode,
  sign,
  verify,
  rawVerify,
};