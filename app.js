//config import
const config = require("./config/config");

// route imports
// const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");

const dbConfig = require("./db_setup");
const express = require("express");
const app = express();

app.use(express.json());

dbConfig();

//API Routes
app.use("/api/register", register);
app.use("/api/users", users);
// app.use('/api/login', login)

app.listen(config.PORT, config.HOST, () =>
  console.log(`Server running on link http://${config.HOST}:${config.PORT}`)
);
