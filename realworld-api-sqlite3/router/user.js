const express = require("express");
const userController = require("../controller/userController");
const userValidator = require("../validator/user");

const router = express.Router();

// 注册
router.post(
  // 请求路径
  "/",
  //   数据校验
  userValidator.register,
  // 控制器
  userController.register
);

// 登录
router.post("/login", userValidator.login, userController.login);

module.exports = router;
