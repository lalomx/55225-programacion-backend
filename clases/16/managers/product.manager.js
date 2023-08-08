const fs = require('fs/promises')

const productModel = require('../models/product.model')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class ProductManager {
  constructor(filename) {
    this.id = getRandomNumber(1, 10) // el id debe de ser el mismo ya que es un singleton
  }

  getAllPaged(page = 1) {

    return productModel.paginate({}, {limit: 5, page, lean: true})
  }

  getAll() {
    return productModel.find().lean()
  }

  async getById(id) {
    const products = await productModel.find({ _id: id })

    return products[0]
  }

  async create(body) {
    return productModel.create(body)
  }

  async update(id, product) {
    const result = await productModel.updateOne({ _id: id }, product)

    return result
  }

  async delete(id) {
    const result = await productModel.deleteOne({ _id: id })

    return result
  }
}

module.exports = new ProductManager() // singleton
