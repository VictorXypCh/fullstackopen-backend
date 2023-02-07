const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

//const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`;

const url = `mongodb+srv://victor:${password}@cluster0.iizifz6.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose
  .connect(url)
  .then(() => {
    console.log("connect success")
  })
  .catch((err) => {
    console.log(err)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model("person", personSchema)

//const note = new Note({
//  content: "HTML is Easy",
//  important: true,
//});

//note.save().then((result) => {
//  console.log("note saved!");
//  mongoose.connection.close();
//});

//Note.find({})
//  .then((result) => {
//    result.forEach((note) => {
//      console.log(note);
//    });
//    mongoose.connection.close();
//  })
//  .catch((err) => {
//    cosnole.log(err);
//  });

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person
    .save()
    .then((result) => {
      console.log(
        "added ",
        process.argv[3],
        " number ",
        process.argv[4],
        " to phonebook"
      )
      mongoose.connection.close()
    })
    .catch((err) => {
      console.log(err)
      mongoose.connection.close()
    })
}
