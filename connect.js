require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("** connect MongoDB **");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connect,
}
