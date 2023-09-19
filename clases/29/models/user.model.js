const { Schema, model, mongo } = require('mongoose')

const schema = new Schema({
  name: String,
  email: String,
  role: String,
  orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'orders' }]
})

const model = model('user', schema)

module.exports = model