var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost", //主机地址
  user: "root", //用户名
  password: "root", //密码
  database: "crud", //数据库名
  port: 3306 //端口号（默认3306）
});
connection.connect();

connection.query("SELECT 1+1 AS solution", function(error, results, fields) {
  if (error) throw error;
  console.log("the solution is:", results[0].solution);
});
