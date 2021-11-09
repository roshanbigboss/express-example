// 引入验证中间件
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const userDao = require("../dao/userDao");

// 调用validate方法,验证注册请求
exports.register = validate([
  // 配置验证规则
  body("user.username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .bail()
    .custom(async (username) => {
      //   查找数据库，判断用户名是否存在
      const user = await userDao.findByUsername(username);
      if (user) {
        return Promise.reject("用户已经存在");
      }
    })
    .bail(),
  body("user.password").notEmpty().withMessage("密码不能为空").bail(),

  body("user.email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (email) => {
      //   查找数据库，判断邮箱是否存在
      const user = await userDao.findByEmail(email);
      if (user) {
        return Promise.reject("邮箱已经存在");
      }
    }),
]);
