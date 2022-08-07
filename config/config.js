const dotenv = require("dotenv");
const path = require("path");
console.log("PATH: ", path.resolve(__dirname, `${process.env.NODE_ENV}.env`));
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
