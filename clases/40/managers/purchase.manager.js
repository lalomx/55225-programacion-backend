const purchaseModel = require('../models/po.model')
const BaseManager = require('./base.manager')

class PurchaseOrderManager extends BaseManager {
  constructor() {
    super(purchaseModel)
  }
}

module.exports = new PurchaseOrderManager() // singleton
