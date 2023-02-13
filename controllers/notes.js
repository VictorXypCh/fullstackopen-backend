const router = require("express").Router()
const Note = require("../models/Note")

router.get("/", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes)
    })
    .catch((error) => next(error))
})
router.post("/", async (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })



    const savedNote = await note.save()
    response.status(201).json(savedNote)
})

router.put("/:id", (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

router.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

router.delete('/:id', async (request, response, next) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
module.exports = router
