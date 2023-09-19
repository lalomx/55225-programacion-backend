const Repository = require('./base.repository')
const { orderModel } = require('../models')

class OrderRepository extends Repository {
  constructor() {
    super(orderModel)
  }

}

module.exports = new OrderRepository()