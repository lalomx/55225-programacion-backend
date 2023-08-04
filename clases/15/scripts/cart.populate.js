const mongoose = require('mongoose')

async function main() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")

  const cartModel = require('../models/cart.model')
  const usersModel = require('../models/user.model')
  const productsModel = require('../models/product.model')

  // hacer mis operaciones

  let cart = await cartModel.findOne({ user: '624af07138abc8971d0b938c' })
    .populate({ path: 'products.product', select: ['title', 'price' ] })
  // .populate('products')

  // const product = await productsModel.findOne({ _id: '64c98c5e5a08ff1b13e63b53' })

  // const p = cart.products.find(pr => pr.product.equals(product._id))

  // if (p) {
  //   p.qty += 1
  // } else {
  //   cart.products.push({
  //     product: product._id,
  //     qty: 1
  //   })
  // }

  // await cart.save()

  // cart = await cart.populate({ path: 'products.product', select: ['title', 'price' ] })

  console.log(cart.products)

  console.log(cart.products.reduce((total, p) => total += p.product.price * p.qty, 0))

  await mongoose.disconnect()
}

main()