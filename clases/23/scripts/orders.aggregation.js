const mongoose = require('mongoose')

const { cartModel, usersModel, productsModel, purchaseOrderModel, addressModel } = require('../models')


async function main() {

  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")
  // aqui vamos a crear nuestro aggregation pipeline

  // const products = await productsModel.aggregate([
  //   {
  //     $match: { platform: 'PC' }
  //   },
  //   {
  //     $group: {
  //       _id: "$developer",
  //       total: { $sum: "$stock" }
  //     }
  //   }
  // ])

  // const orders = await purchaseOrderModel.aggregate([
  //   {
  //     $sort: { estimatedDelivery: 1 }
  //   },
  //   {
  //     $limit: 5
  //   },
  //   {
  //     $lookup: {
  //       from: "addresses",
  //       localField: "postAddress",
  //       foreignField: "_id",
  //       as: "deliveryAddress"
  //     }
  //   },
  //   {
  //     $set: {
  //       postAddress: { $arrayElemAt: [ "$deliveryAddress", 0] }
  //     }
  //   },
  //   {
  //     $project: {
  //       postAddress: 1, products: 1, total: 1
  //     }
  //   }
  //   // {},
  //   // {},
  //   // {}
  // ])

  const ordersByCountry = await purchaseOrderModel.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "postAddress",
        foreignField: "_id",
        as: "deliveryAddress"
      }
    },
    {
      $set: {
        postAddress: { $arrayElemAt: [ "$deliveryAddress", 0] }
      }
    },
    {
      $project: {
        postAddress: 1, total: 1, products: 1
      }
    },
    {
      $group: {
        _id: "$postAddress.country",
        money: { $sum: "$total" }
      }
    },
    {
      $sort: { money: 1 }
    }
  ])
 

  console.log(JSON.stringify(ordersByCountry, null, 2))


  // productsModel.find()

  // http://localhost:3000/api/products?page=1&limit=10&query={ title: 'A' }&sort=desc

  await mongoose.disconnect()
}

main()

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