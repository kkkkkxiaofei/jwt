const { decode } = require('../utils');
const { ID_TOKEN } = require('../config');

console.log(decode(ID_TOKEN));