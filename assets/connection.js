const util = require("util");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "Cooleono9!",
  database: "employeedb"
});

connection.connect(function (err) {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;