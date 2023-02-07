const express = require("express");
const app = express();
const { requestLogger } = require("./utils/middleware");
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const mongodb = require("./connect");

mongodb.connect();

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.static("build"));
app.use("/api/notes", require("./controllers/notes"));
app.use("/api/persons", require("./controllers/persons"));

app.get("/", (req, res) => {
  res.send("hello world");
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
     } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
