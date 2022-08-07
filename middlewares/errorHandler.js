const { Prisma } = require("@prisma/client");

const errorHandler = (err, req, resp, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      resp.status(400).send({
        status: "Failed",
        message: "Unique constraint failed. Please enter a unique value",
      });
    }
  }
  next(err);
};

module.exports = errorHandler;
