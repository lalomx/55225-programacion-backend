const { Schema, model } = require('mongoose')

const schema = new Schema({
  line1: String,
  line2: String,
  city: String,
  zipCode: Number,
  country: String,
  telephone: String
})

const addressModel = model('addresses', schema)

module.exports = addressModel