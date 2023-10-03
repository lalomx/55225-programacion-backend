const mongoose = require('mongoose')
const config = require('../config/config')
class MongoDb {
  static #instance

  constructor() {
    this.id = 10
    this.connection = mongoose.connect(config.MONGO_URL)
  }

  static getInstance() {
    if(!this.#instance) {
      this.#instance = new MongoDb()
    }

    return this.#instance
  }

  disconnect() {
    return mongoose.disconnect()
  }
}

module.exports = MongoDb

