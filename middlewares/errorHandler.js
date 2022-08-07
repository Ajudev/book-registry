const { Prisma } = require("@prisma/client");

const errorHandler = (err, req, resp, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return resp.status(400).send({
        status: "Failed",
        message: "Unique constraint failed. Please enter a unique value",
      });
    }
  } else {
    resp.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
      error: err,
    });
  }
  next(err);
};

module.exports = errorHandler;
