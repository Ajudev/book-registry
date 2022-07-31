const router = require("express").Router();
const dbQuery = require("../services/db");

router.get("", async (req, resp) => {
  let query = "select username,email from Users";
  dbQuery(query, (err, results) => {
    console.log(results);
    err
      ? resp.status(400).send({
          status: "Failed",
          error: err.message,
        })
      : resp.status(200).send({ status: "Success", data: results });
  });
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  let query = "select username, email from Users where username=?";
  dbQuery(query, [id], (err, results) => {
    if (err)
      resp.status(400).send({
        status: "Failed",
        error: err.message,
      });
    else {
      !results.length
        ? resp
            .status(404)
            .send({ status: "Failed", message: "No user with given id found" })
        : resp.status(200).send({ status: "Success", data: results });
    }
  });
});

module.exports = router;
