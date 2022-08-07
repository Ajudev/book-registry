const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbQuery = require("../services/db");
const jwt = require("jsonwebtoken");

router.post("", async (req, resp) => {
  const user = await dbQuery.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    const passMatch = await bcrypt.compare(req.body.password, user.password);
    if (passMatch) {
      const token = await jwt.sign(
        { id: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: 60 * 5,
        }
      );
      resp.status(200).send({
        status: "Success",
        message: "User login successful",
        token: token,
      });
    } else {
      resp.status(400).send({
        status: "Failed",
        message: "Invalid user credentials",
      });
    }
  } else {
    resp.status(404).send({
      status: "Failed",
      message: "User with credentials not found",
    });
  }
});

module.exports = router;
