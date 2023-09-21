const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: String,
  products: []
})

module.exports = model('business', schema)