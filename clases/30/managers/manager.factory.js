const productManager = require('./product.manager')
const cartManager = require('./cart.manager')
const chatMessageManager = require('./chat.message.manager')
const userManager = require('./user.manager')

const productManagerFile = require('./product.manager.file')

const { PERSISTANCE } = require('../config/config')

class ManagerFactory {

  static getManagerInstance(name) {
    console.log(PERSISTANCE, name)
    if (PERSISTANCE == "mongo") {
        // regresar alguno de los managers de mongo
        switch(name) {
          case "products":
            return productManager
        }
    } else {
      // regresar alguno de los managers de json
      switch(name) {
        case "products":
          return productManagerFile
      }
    }
  }
}

module.exports = ManagerFactory