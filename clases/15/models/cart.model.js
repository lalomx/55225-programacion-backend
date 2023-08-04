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

schema.pre("findOne", function () {
  this.populate({ path: 'user', select: ['email', 'firstname', 'lastname'] })
})

const cartModel = model('carts', schema)


// {
//   user: 1,
//   products: [{
//     product: 00,
//     qty: 1
//   }]
// }

module.exports = cartModel