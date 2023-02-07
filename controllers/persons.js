const route = require("express").Router();
const Person = require("../models/Person");

route.get("/info", (req, res, next) => {
  //  res.send(str);
  Person.count()
    .then((result) => {
      let str = `phonebook has info for ${result} people\n\n`;
      str += new Date();
      res.send(str);
    })
    .catch((error) => next(error));
});

route.get("/", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

route.get("/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});
route.post("/", (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  person
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

route.put("/:id", (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

route.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = route;
