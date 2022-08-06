const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbQuery = require("../services/db");

const loginCallback = (err, results, req, resp) => {
  if (err) {
    resp.status(400).send({
      status: "Failed",
      message: "Failed to fetch user details",
      error: err.message,
    });
  } else {
    if (!results.length) {
      resp.status(404).send({
        status: "Failed",
        message: "User with credentials not found",
      });
    } else {
      bcrypt.compareSync(req.body.password, results[0].password)
        ? resp.status(200).send({
            status: "Success",
            message: "User login successfull",
          })
        : resp.status(400).send({
            status: "Failed",
            message: "Invalid user credentials",
          });
    }
  }
};

router.post("", async (req, resp) => {
  dbQuery(
    "select * from Users where username=?",
    [req.body.username],
    (err, results) => loginCallback(err, results, req, resp)
  );
});

module.exports = router;
