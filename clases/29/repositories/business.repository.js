const Repository = require('./base.repository')
const { businessModel } = require('../models')

class BusinessReposity extends Repository {
  constructor() {
    super(businessModel)
  }
}

module.exports = new BusinessReposity()