const sqlite3 = require("sqlite3").verbose();
let db;
exports.db = db;

// 建立数据库链接
exports.open = (path) => {
  return new Promise((resolve, reject) => {
    this.db = new sqlite3.Database(path, (err) => {
      if (err) {
        reject("Open error", err.message);
      } else {
        resolve("数据库建立链接");
      }
    });
  });
};

// 执行sql语句，执行除了查询之外的建表，更新，删除操作
exports.run = (query) => {
  return new Promise((resolve, reject) => {
    this.db.run(query, (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(true);
      }
    });
  });
};
//查询一行
exports.get = (query, params) => {
  return new Promise((resolve, reject) => {
    this.db.get(query, params, (err, row) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
};

// 查询所有
exports.all = (query, params) => {
  return new Promise((resolve, reject) => {
    this.db.all(query, params, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
};

// 关闭链接

exports.close = () => {
  return new Promise((resolve, reject) => {
    this.db.close();
    resolve(true);
  });
};
