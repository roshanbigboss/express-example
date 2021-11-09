const jwt = require("../util/jwt");
exports.register = async (req, res, next) => {
  res.send("register");
};

exports.login = async (req, res, next) => {
  // 生成token
  const user = req.user;
  const token = await jwt.sign(
    {
      email: user.email,
    },
    "hello"
  );
  // 发送成功的响应(包含token信息)
  delete user.password;
  res.status(200).json({
    ...user,
    token,
  });
};
