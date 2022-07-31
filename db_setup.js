const dbQuery = require("./services/db");

const checkTableExists = () => {
  query = "SHOW TABLES LIKE 'Users'";
  dbQuery(query, (err, result, fields) => {
    if (err) console.log(err.message);
    else {
      if (!result.length) {
        create_query =
          "CREATE TABLE Users (username varchar(50) PRIMARY KEY NOT NULL, password varchar(100) NOT NULL, email varchar(255))";
        dbQuery(create_query, (err) => {
          if (err) console.log(err.message);
        });
      }
    }
    console.log("DB setup done");
  });
};

module.exports = checkTableExists;
