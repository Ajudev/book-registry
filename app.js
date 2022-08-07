//config import
const config = require("./config/config");

// route imports
const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");

const express = require("express");
const app = express();

//Middlewares
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

//API Routes
app.use("/api/register", register);
app.use("/api/users", users);
app.use("/api/login", login);

app.use(errorHandler);

app.listen(config.PORT, config.HOST, () =>
  console.log(`Server running on link http://${config.HOST}:${config.PORT}`)
);

module.exports = app;
