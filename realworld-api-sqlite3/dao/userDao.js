const db = require("../util/db");
const { promisify } = require("util");
const path = require("path");

// 创建用户表
const ceateTalbeSQL = `
create table if not exists users(
    email text primary key not null,
    username text,
    password text
)
`;
exports.findByUsername = async (username) => {
  await db.open(path.resolve(__dirname, "../db/realworld.db"));
  const result = await db.run(ceateTalbeSQL);
  const user = await db.get(
    "select username,email from users where username = ?",
    [username]
  );
  // db.close();
  return user;
};
exports.findByEmail = async (email) => {
  await db.open(path.resolve(__dirname, "../db/realworld.db"));
  const result = await db.run(ceateTalbeSQL);
  const user = await db.get(
    "select username,email from users where email = ?",
    [email]
  );
  // db.close();
  return user;
};
