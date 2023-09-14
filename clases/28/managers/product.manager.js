const productModel = require('../models/product.model')
const BaseManager = require('./base.manager')


class ProductManager extends BaseManager {
  constructor() {
    super(productModel)
  }

  getAll() {
    // aqui ya se sobreescribe el metodo
    return this.model.find().lean()
  }

  getAllPaged(page = 1, limit = 15) {
    console.log('ProductManager')
    return this.model.paginate({}, { limit, page, lean: true })
  }

}

module.exports = new ProductManager() // singleton
