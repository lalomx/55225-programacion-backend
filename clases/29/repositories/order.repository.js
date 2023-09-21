const Repository = require('./base.repository')
const { orderModel } = require('../models')

class OrderRepository extends Repository {
  constructor() {
    super(orderModel) 
  }

  async changeStatus(id, status) {
    try {
      const order = await this.getById(id)
      order.status = status

      await order.save()

      return true
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = new OrderRepository()