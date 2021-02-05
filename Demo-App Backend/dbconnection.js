var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_db",
  multipleStatements: true,
});
module.exports = connection;
