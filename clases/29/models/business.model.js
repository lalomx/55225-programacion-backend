const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: String,
  products: [],
})

const model = model('business', schema)

module.exports = model
