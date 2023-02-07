const route = require("express").Router();
const Person = require("../models/Person");

route.get("/info", (req, res) => {
  let str = `phonebook has info for ${persons.length} people\n\n`;
  str += new Date();
  res.send(str);
});

route.get("/api/persons", (req, res) => {
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

route.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("not found");
  }
});
route.post("/api/persons", (req, res) => {
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

route.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

module.exports = route;
