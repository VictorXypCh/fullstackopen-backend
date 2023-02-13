require("dotenv").config();
const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");

let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
// This will create an new instance of "MongoMemoryServer" and automatically start it
mongoose.set("strictQuery", false);
let mongod;
const connect = async () => {
  if (process.env.NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    console.log("** Started MongoMemoryServer **");
    MONGODB_URI = mongod.getUri();
  }

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("** connect MongoDB **");
      console.log(MONGODB_URI);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connect,
    mongod
};
