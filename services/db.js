const mysql = require("mysql");
const config = require("../config/config");

const writeToDB = (query, params, callback) => {
  console.log("DB NAME", config.DB_NAME);
  console.log("DB PORT", config.DB_PORT);
  const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
  });
  connection.connect();
  connection.query(query, params, callback);
  connection.end();
};

module.exports = writeToDB;
