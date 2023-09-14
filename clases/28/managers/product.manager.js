const productModel = require('../models/product.model')
const BaseManager = require('./manager.base')

class ProductManager extends BaseManager {
  constructor() {
    super(productModel)
  }

  // expandir los metodos
  // el de user por get by email

  // getAll() {
  //   return productModel.find().lean()
  // }

  // getAllPaged(page = 1, limit = 5) {
  //   return productModel.paginate({}, { limit, page, lean: true })
  // }

  // async getById(id) {
  //   const products = await productModel.find({ _id: id })

  //   return products[0]
  // }

  // async create(body) {
  //   // se puede usar el DTO aqui

  //   return productModel.create(body)
  // }

  // async update(id, product) {
  //   // se puede usar el DTO aqui
  //   const result = await productModel.updateOne({ _id: id }, product)

  //   return result
  // }

  // async delete(id) {
  //   const result = await productModel.deleteOne({ _id: id })

  //   return result
  // }
}

module.exports = new ProductManager() // singleton
