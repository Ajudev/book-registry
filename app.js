const config = require("./config/config");
// const login = require("./routes/login");
const register = require("./routes/register");
const express = require("express");
const app = express();

app.use(express.json());

//API Routes
app.use("/api/register", register);
// app.use('/api/login', login)

app.listen(config.PORT, config.HOST, () =>
  console.log(`Server running on link http://${config.HOST}:${config.PORT}`)
);
