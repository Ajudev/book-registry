const router = require("express").Router();
const dbQuery = require("../services/db");

router.get("/all", async (req, resp) => {
  const users = await dbQuery.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  resp.status(200).send({ status: "Success", data: users });
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  const user = await dbQuery.user.findUnique({
    select: {
      id: true,
      username: true,
      email: true,
    },
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
