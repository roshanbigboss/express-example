const express = require("express");
const router = require("./router");
const cors = require("cors");
const db = require("./util/db");

// 创建express实例
const app = express();

// 设置端口号
const PORT = process.env.PORT || 3000;
//----------设置中间件-----------------
// 跨域中间件
app.use(cors());
// 请求体解析中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 挂载路由到express实例
app.use("/api", router);
// 404
app.use((req, res, next) => {
  res.status(404).json({
    error: "没有匹配的路由",
  });
});

// 错误处理中间件(放在所有路由之后)
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
  });
});

const server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
