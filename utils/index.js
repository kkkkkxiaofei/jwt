const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const decode = (value, options = {}) => jwt.decode(value, options);

const rawDecode = jws => {
  const [header, payload, signature] = jws.split('.');
  const decodeBase64 = encodedThing => JSON.parse(Buffer.from(encodedThing, 'base64').toString());
  return {
    header: decodeBase64(header),
    payload: decodeBase64(payload),
    signature
  }
};

const sign = (payload, serectOrPrivateKey = SECRET, options = {algorithm: 'RS256'}) => 
  jwt.sign(payload, serectOrPrivateKey, options);

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

const pkce = () => {
  const base64URLEncode = (str) => {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  };
  const sha256 = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest();
  };

  const verifier = base64URLEncode(crypto.randomBytes(32));
  
  return {
    verifier,
    challenge: base64URLEncode(sha256(verifier))
  }
};

module.exports = {
  decode,
  sign,
  verify,
  rawVerify,
  pkce,
  rawDecode,
};