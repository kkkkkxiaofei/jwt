const jwt = require('jsonwebtoken');

const decode = value => jwt.decode(value);

module.exports = {
  decode
};