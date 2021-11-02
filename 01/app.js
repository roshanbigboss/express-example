const express = require("express");
const fs = require("fs");
const app = express();
//配置解析表单请求体，请求体格式是:application/json
app.use(express.json());
//配置解析表单请求体，请求体格式是:application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//查询任务列表
app.get("/todos", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const db = JSON.parse(data);
    res.status(200).json(db.todos);
  });
});
// 查询单个任务列表
app.get("/todos/:id", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const db = JSON.parse(data);
    const todo = db.todos.find(
      (item) => item.id === Number.parseInt(req.params.id)
    );
    if (!todo) {
      return res.status(400).send();
    }
    res.status(200).json(todo);
  });
});

//添加任务
app.post("/todos", (req, res) => {
  // 1.获取接口传进来的数据
  const todo = req.body;
  // 2.校验数据
  if (!todo.title) {
    return res.status(500).json({
      error: "the field title is required",
    });
  }
  // 读取db.json中的数据
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    }

    // 字符串转成对象
    const db = JSON.parse(data);
    // 获取todos数据最后一个元素
    const lastTodo = db.todos.slice(-1)[0];

    // 给传进来的数据设置id
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    // 对象转成字符串
    const newData = JSON.stringify(db);
    // 保存到db.json文件
    fs.writeFile("./db.json", newData, (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      res.status(200).json(todo);
    });
  });
});
//修改任务列表
app.patch("/todos/:id", (req, res) => {
  // 获取修改的id,+用户将字符串转换成整数
  const id = +req.params.id;
  //校验数据
  const todo = req.body;
  if (!todo.title) {
    return res.status(500).json({
      error: "the field title is required",
    });
  }
  // 读取db.json数据
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "修改数据失败",
      });
    }
    const db = JSON.parse(data);

    db.todos.forEach((e) => {
      if (e.id === id) {
        e.title = todo.title;
      }
    });
    const newData = JSON.stringify(db);
    fs.writeFile("./db.json", newData, (err) => {
      err
        ? res.status(500).json({
            error: err.message,
          })
        : res.status(200).json({
            success: "修改成功",
          });
    });
  });
});
//删除任务列表
app.delete("/todos/:id", (req, res) => {
  // 获取删除的id
  const id = +req.params.id;
  // 读取db.json数据
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "读取数据失败",
      });
    }
    // json字符串转换成对象
    const db = JSON.parse(data);
    // 判断删除的id是否存在
    const index = db.todos.findIndex((e) => e.id === id);
    if (!index) {
      return res.status(500).json({
        error: `id:${id}不存在`,
      });
    }
    // 删除数据
    db.todos.splice(index, 1);
    // db.todos = db.todos.filter((e) => e.id != id);
    // 写入db.json
    const newData = JSON.stringify(db);
    fs.writeFile("./db.json", newData, (err) => {
      err
        ? res.status(500).json({
            error: err.message,
          })
        : res.status(200).json({
            success: "删除成功",
          });
    });
  });
});

app.listen(3000, () => {
  console.log("Server running at https://localhost:3000/");
});
