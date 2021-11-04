// 路由模块

const express = require("express");
// 1.创建路由实例
const router = express.Router();

// 2.配置路由
router.get("/a", (req, res) => {
  res.send("GET /user/a");
});
router.post("/a", (req, res) => {
  res.send("POST /user/a");
});

router.get("/b", (req, res) => {
  res.send("/user/b");
});

// 3.导出路由实例
module.exports = router;

// 4.将路由挂载到app实例上
