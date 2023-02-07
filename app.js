const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongodb = require("./connect");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.use(express.json());
app.use(cors());

logger.info("connecting to: ", config.MONGODB_URI);
mongodb.connect();

morgan.token("body", function (req) {
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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;
