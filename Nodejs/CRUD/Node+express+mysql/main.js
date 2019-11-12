var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost", // 主机地址
  user: "root", // 用户名
  password: "alvinmi", // 密码
  database: "crud", // 数据库名
  port: 3306 // 端口号（默认3306）
});
connection.connect();

const addSql = "INSERT INTO t_express(ID, name, sex) VALUES(0,?,?)";
const addSqlParams = ["aa", "cc"];
// connection.query("SELECT 1+1 AS solution", function(error, results, fields) {
//   if (error) throw error;
//   console.log("the solution is:", results[0].solution);
// });

// SLECTE * from mytest; //查询数据

// 增
// connection.query(addSql, addSqlParams, function(error, results, fields) {
//   if (error) {
//     console.log("error");
//     throw error;
//   }
//   console.log("INSERT ID:", results);
// });

// 删除数据
// connection.query("DELETE FROM t_express where id=1", function(err, result) {
//   if (err) {
//     console.log("error");
//     return;
//   }
//   console.log("DELETE affectedRows", result.affectedRows);
// });

// 改 -> 查看结果 select * from t_express
// connection.query("UPDATE t_express SET name=? where id=2", "勒是雾都", function(
//   err,
//   result
// ) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("update affectedRows", result.affectedRows);
// });

// 查看数据
connection.query("select * from t_express", function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

connection.end();
