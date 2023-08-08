const { Schema, model } = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  keywords: [String],
  platform: { type: String, enum: ['PlayStation', 'Xbox', 'Nintendo Switch', 'PC'], default: "Xbox" },
  stock: { type: Number, default: 0 },
  developer: String,
  createdDate: { type: Number, default: Date.now() }
})

schema.plugin(paginate)
const productModel = model('products', schema)

module.exports = productModel