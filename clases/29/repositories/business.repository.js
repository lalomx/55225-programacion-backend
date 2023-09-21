const Repository = require('./base.repository')
const { businessModel } = require('../models')

class BusinessRepository extends Repository {
  constructor() {
    super(businessModel)
  }

  //
  async addProduct(id, product) {
    try {
      const business = await this.getById(id)

      business.products = business.products ?? []
      business.products.push(product)

      const result = await business.save()
      console.log(result)
      return true
    } catch(e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = new BusinessRepository()