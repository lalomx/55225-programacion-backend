// importar el modelo
// leer el json de productos
// insert o importar el json en mongo

/// operaciones con mongo

const fs = require('fs/promises')
const path = require('path')
const mongoose = require('mongoose')
const utils = require('./common')

const productModel = require('../models/product.model')

async function seed() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")

  // const filepath = path.join(__dirname, '../', 'data/productos.json')
  // const data = await fs.readFile(filepath, 'utf-8')
  // const products = JSON.parse(data).map(({ id, ...product }) => product)

  const result = await productModel.insertMany(utils.generateGames(1000))

  console.log(result)

  await mongoose.disconnect()
}

seed()