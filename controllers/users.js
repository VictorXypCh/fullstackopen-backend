const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (request, response) => {
  const result = await User.find({});
  response.json(result);
});
router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = router;