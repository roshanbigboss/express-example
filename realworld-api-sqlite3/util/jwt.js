const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// 生成JWT
exports.sign = promisify(jwt.sign);
// 验证JWT
exports.verify = promisify(jwt.verify);
// 直接解析
exports.decode = promisify(jwt.decode);
