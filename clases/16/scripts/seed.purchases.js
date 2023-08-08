const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const moment = require('moment')

const utils = require('./common')
const { cartModel, usersModel, productsModel, purchaseOrderModel, addressModel } = require('../models')

async function main() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")

  
  

  await mongoose.disconnect()
}

async function generatePurchases() {
    const users = await usersModel.find({ role : "Admin", gender : "Female" }).limit(10).lean()
  const products = await productsModel.find().lean()

  for (const user of users) {
    faker.helpers.shuffle(products, { inplace: true })
    const addr = await addressModel.create(utils.generateAddresses(1)[0])
    const cart = faker.helpers.arrayElements(products, { min: 1, max: products.length }).map((p) => ({
        product: p,
        qty: faker.number.int({ min: 1, max: 2 })
    }))

    const po = await purchaseOrderModel.create({
        user: user._id,
        total: cart.reduce((total, p) => total += p.product.price * p.qty, 0),
        postAddress: addr._id,
        products: cart.map(({ qty, product: { _id } }) => ({
            product: _id,
            qty: qty
        })),
        estimatedDelivery: moment(faker.date.future()).unix()
    })

    console.log(po)
  }
}

// const products = await productsModel.find()

// for (const p of products) {
// p.stock = faker.number.int({ min: 45, max: 1500 }),
// p.developer = faker.company.name(),
// p.releaseDate = faker.date.past(),
// p.platform = faker.helpers.arrayElement(['PlayStation', 'Xbox', 'Nintendo Switch', 'PC'])
// await p.save()
// }

main()