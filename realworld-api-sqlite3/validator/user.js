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

// 调用validate方法，验证登录请求

exports.login = [
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  // 上面的数据校验成功，才会执行下面的数据库查询校验
  validate([
    body("user.email").custom(async (email, { req }) => {
      //   查找数据库，判断用户是否存在
      const user = await userDao.findByEmail(email);
      if (!user) {
        return Promise.reject("用户不存在");
      }
      // 将数据挂载到请求对象中，后续的中间件也可以使用
      req.user = user;
    }),
  ]),
  // 用户存在，才会执行下面的密码验证
  validate([
    body("user.password").custom(async (password, { req }) => {
      if (password !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];
