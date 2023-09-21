const Repository = require('./base.repository')
const { userModel } = require('../models')

class UserRepository extends Repository {
  constructor() {
    super(userModel) 
  }
}

module.exports = new UserRepository()