// importar el modelo
// leer el json de productos
// insert o importar el json en mongo

/// operaciones con mongo

const fs = require('fs/promises')
const path = require('path')
const mongoose = require('mongoose')

const productModel = require('../models/product.model')

async function seed() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/?retryWrites=true&w=majority")

  const filepath = path.join(__dirname, '../', 'data/productos.json')
  const data = await fs.readFile(filepath, 'utf-8')
  const products = JSON.parse(data).map(p => {
    const { id, ...product } = p

    return product
  })

  const result = await productModel.insertMany(products)

  console.log(result)
}

seed()