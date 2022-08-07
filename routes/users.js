const router = require("express").Router();
const dbQuery = require("../services/db");

router.get("", async (req, resp) => {
  const users = await dbQuery.user.findMany();
  resp.status(200).send({ status: "Success", data: users });
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  const user = await dbQuery.user.findUnique({
    where: {
      username: id,
    },
  });
  user
    ? resp.status(200).send({ status: "Success", data: user })
    : resp
        .status(404)
        .send({ status: "Failed", message: "No user with given id found" });
});

module.exports = router;
