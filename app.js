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
const authenticate = require("./middlewares/auth");

app.use(express.json());

//API Routes
app.use("/api/user/register", register);
app.use("/api/user/login", login);
app.use("/api/user/fetch", authenticate, users);

app.use(errorHandler);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `Server running on link http://${process.env.HOST}:${process.env.PORT}`
  )
);

module.exports = app;
