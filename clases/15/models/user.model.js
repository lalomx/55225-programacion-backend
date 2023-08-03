const { Schema, model } = require('mongoose')

const schema = new Schema({
  firstname: { type: String, index: true },
  lastname: String,
  email: String,
  password: String,
  role: String,
  gender: String,
  createdDate: { type: Number, default: Date.now() }
})

const userModel = model('users', schema)

module.exports = userModel