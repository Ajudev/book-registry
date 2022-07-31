let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
const dbQuery = require("../services/db");

chai.use(chaiHttp);

describe("/POST register", () => {
  it("registers users with system", (done) => {
    let user = {
      username: "newUser",
      email: "admin@gmail.com",
      password: "#test123",
    };
    chai
      .request(server)
      .post("/api/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        dbQuery(
          "DELETE from Users where username=?",
          [user.username],
          (err) => {
            if (err) throw err;
          }
        );
        done();
      });
  });
});
