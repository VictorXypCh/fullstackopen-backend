require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("** connect MongoDB **");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  connect,
};
