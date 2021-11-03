const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const dbPath = path.join(__dirname, "./db.json");

exports.getDB = async () => {
  const data = await readFile(dbPath, "utf-8");
  return JSON.parse(data);
};

exports.saveDB = async (oData) => {
  const sData = JSON.stringify(oData);
  await writeFile(dbPath, sData);
};
