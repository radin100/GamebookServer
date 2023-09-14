const util = require('util');
const jwt = require('jsonwebtoken');

const decode = util.promisify(jwt.decode);
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = {
    decode,
    sign,
    verify
}