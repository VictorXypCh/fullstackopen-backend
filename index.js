const express = require("express");
const app = express();
const { requestLogger } = require("./utils/middleware");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());
//app.use(requestLogger);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/notes", require("./controllers/notes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  let str = `phonebook has info for ${persons.length} people\n\n`;
  str += new Date();
  res.send(str);
});

app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("not found");
  }
});
app.post("/api/persons", (req, res) => {
  try {
    const id = Math.floor(Math.random() * 100);
    const body = req.body;
    if (!body.name || !body.number) throw "name must be unique";
    const isExist = persons.find(
      (person) => person.name === body.name || person.number === body.number
    );
    if (!isExist) {
      const newPerson = { id, name: body.name, number: body.number };
      persons.concat(newPerson);
      res.json(newPerson);
    } else {
      throw "name must be unique";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
