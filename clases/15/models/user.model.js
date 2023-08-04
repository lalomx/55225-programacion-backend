const { Schema, model } = require('mongoose')

const schema = new Schema({
  firstname: String,
  lastname: { type: String, index: true },
  email: String,
  password: String,
  role: String,
  gender: String,
  createdDate: { type: Number, default: Date.now() }
})

const userModel = model('users', schema)

module.exports = userModel