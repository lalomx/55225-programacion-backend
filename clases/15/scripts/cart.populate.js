
const mongoose = require('mongoose')


async function main() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")

  const cartModel = require('../models/cart.model')
  const usersModel = require('../models/user.model')
  const productsModel = require('../models/product.model')
  // const result = await model.insertMany(usersRecords)

  // const result = await model.create({
  //   user: '624d050778102c894396b4c1'
  // })

  let cart = await cartModel.findOne({ user: '624d050778102c894396b4c1' })
  
  console.log(cart)

  // const product = await productsModel.findOne()

  // // console.log(cart.products)
  // // console.log(product._id)

  // if (!cart.products.length) {
  //   cart.products.push({
  //     product: product._id,
  //     qty: 1
  //   })
  // } else {
  //   const p = cart.products.find(pr => pr.product.equals(product._id))
  //   // console.log(p)
  //   p.qty = 2 
  // }

  // await cart.save()

  // cart = await cart.populate('products.product', 'title')

  // console.log(cart.products)

  await mongoose.disconnect()
}

main()

