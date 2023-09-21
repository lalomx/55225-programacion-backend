const { Schema, model, SchemaTypes } = require('mongoose')

const schema = new Schema({
  name: String,
  email: String,
  role: String,
  orders: [{ type: SchemaTypes.ObjectId, ref: 'order' }]
})

module.exports = model('user', schema)