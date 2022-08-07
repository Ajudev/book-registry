const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbQuery = require("../services/db");

router.post("", async (req, resp, next) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const registerUser = await dbQuery.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      },
    });
    "id" in registerUser
      ? resp.status(200).send({ status: "Success", message: "User Created" })
      : resp.status(400).send({
          status: "Failed",
          message: "User creation failed",
        });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
