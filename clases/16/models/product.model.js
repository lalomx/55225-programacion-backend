const { Schema, model } = require('mongoose')


const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  keywords: [String],
  stock: { type: Number, default: 0 },
  createdDate: { type: Number, default: Date.now() }
})

const productModel = model('products', schema)

module.exports = productModel