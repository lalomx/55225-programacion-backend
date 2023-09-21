const { Schema, model, SchemaTypes } = require('mongoose')

const schema = new Schema({
  no: String, // O-1000-AVC
  business: { type: SchemaTypes.ObjectId , ref: 'business' },
  user: { type: SchemaTypes.ObjectId, ref: 'user' },
  products: [],
  total: Number,
  status: { type: String, default: 'pendiente' } // pendiente, en-camino, entregada
})

module.exports = model('order', schema)