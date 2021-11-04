const express = require("express");
// 引入路由
const router = require("./user");

const app = express();

app.use(express.json());

// 将router挂载到app实例上
// app.use(router);

// 给路由限定访问前缀
app.use("/user", router);

app.use("/book", (req, res, next) => {
  try {
    throw "测试异常";
  } catch (err) {
    next(err); //跳转到错误处理中间件
  }
});
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
