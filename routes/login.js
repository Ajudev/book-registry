const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbQuery = require("../services/db");

router.post("", async (req, resp) => {
  const user = await dbQuery.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    const passMatch = await bcrypt.compare(req.body.password, user.password);
    !passMatch
      ? resp.status(400).send({
          status: "Failed",
          message: "Invalid user credentials",
        })
      : resp.status(200).send({
          status: "Success",
          message: "User login successful",
        });
  } else {
    resp.status(404).send({
      status: "Failed",
      message: "User with credentials not found",
    });
  }
});

module.exports = router;
