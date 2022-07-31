const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbQuery = require("../services/db");

router.post("", async (req, resp) => {
  const hashedPassword = await bcrypt.hashSync(req.body.password);
  let query = "insert into Users values (?, ?, ?) ";
  dbQuery(query, [req.body.username, hashedPassword, req.body.email], (err) => {
    err
      ? resp.status(400).send({
          status: "Failed",
          message:
            err.code === "ER_DUP_ENTRY"
              ? "User already exists"
              : "User creation failed",
          error: err.message,
        })
      : resp.status(200).send({ status: "Success", message: "User Created" });
  });
});

module.exports = router;
