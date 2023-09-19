const { Schema, model } = require('mongoose')

const schema = new Schema({
  no: String,
  business: { type: mongoose.SchemaTypes.ObjectId, ref: 'business' },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
  products: [],
  total: Number,
  status: Boolean
})

const model = model('order', schema)

module.exports = model