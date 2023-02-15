const router = require("express").Router();
const Note = require("../models/Note");
const User = require("../models/User");

router.get("/", async (request, response) => {
  const result = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(result);
});
router.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user.id,
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

router.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

router.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

router.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});
module.exports = router;
