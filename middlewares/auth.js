const jwt = require("jsonwebtoken");
const dbQuery = require("../services/db");

const auth = async (req, resp, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY,
      (error, decode) => {
        if (error)
          return resp
            .status(401)
            .send({ status: "Failed", message: "Invalid Token" });
        const user = dbQuery.user.findUnique({
          where: {
            username: decode.id,
          },
        });
        if (user) {
          req.user = user;
          next();
        } else {
          resp.status(401).send({
            status: "Failed",
            message: "Invalid Authentication Details",
          });
        }
      }
    );
  } else {
    resp
      .status(401)
      .send({ message: "Authentication credentials were not provided." });
  }
};

module.exports = auth;
