const productModel = require('../models/product.model')
const BaseManager = require('./base.manager')
const { generateUsers, generateProducts } = require('../utils/mock.utils.js')

// repository
// jpa en java
class ProductManager extends BaseManager {
  constructor() {
    super(productModel)
  }

  getBySKU(sku) {
    return this.model.find({ sku }).lean()
  }

  getById(id) {
    return this.model.findOne({ _id: id })
  }

  // mas metodos
  getProductsInPriceRange(min, max) {
    return this.model.find(
      { $and: [
        { price: { $gte: min }},
        { price: { $lte: max} }
      ]
    })
  }

  // async create(body) { // BODY es nuestra DTO
  //   const { name } = body
  //   return this.model.create({ title: name })
  // }

  getAll() {
    // aqui ya se sobreescribe el metodo
    // return this.model.find().lean()
    return generateProducts()
  }

  // getAllPaged(page = 1, limit = 15) {
  //   console.log('ProductManager')
  //   return this.model.paginate({}, { limit, page, lean: true })
  // }

}

module.exports = new ProductManager() // singleton
