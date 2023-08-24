const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  postAddress: { type: Schema.Types.ObjectId, ref: 'addresses' },
  total: Number,
  products: { 
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      qty: { type: Number, default: 0 }
    }],
    default: []
  },
  estimatedDelivery: Number
})

const purchaseOrderModel = model('orders', schema)

module.exports = purchaseOrderModel