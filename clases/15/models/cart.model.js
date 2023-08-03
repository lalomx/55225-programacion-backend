const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  products: { 
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      qty: { type: Number, default: 0 }
    }], 
    default: [] 
  },
  createdDate: { type: Number, default: Date.now() }
})

schema.pre("findOne", () => {
  this.populate('user', 'email')
})

const cartModel = model('carts', schema)



module.exports = cartModel
