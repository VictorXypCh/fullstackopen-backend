const mongoose = require("mongoose")
const personSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number requied"],
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
