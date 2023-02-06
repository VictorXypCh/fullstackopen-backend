const route = require("express").Router();
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

route.get("/info", (req, res) => {
  let str = `phonebook has info for ${persons.length} people\n\n`;
  str += new date().tostring();
  res.send(str);
});

route.get("/", (req, res) => {
  let str = `phonebook has info for ${persons.length} people\n\n`;
  str += new date().tostring();
  res.send(str);
});

module.exports = route;
