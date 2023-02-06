const route = require("express").Router();
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

route.get("/", (req, res) => {
  res.json(notes);
});
route.get("/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

route.post("", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

route.put("/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  if (!id) {
    return response.status(400).json({
      error: "incorrect id",
    });
  }

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = notes.find((e) => e.id === id);

  if (note) {
    note.content = body.content;
    note.important = body.important || false;
    note.date = new Date();
    return response.json(note);
  } else {
    return response.status(400).send("Not found");
  }
});

route.delete("/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

module.exports = route;
