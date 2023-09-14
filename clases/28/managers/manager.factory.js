const productManager = require('./product.manager')
const cartManager = require('./cart.manager')
const chatMessageManager = require('./chat.message.manager')
const userManager = require('./user.manager')

class ManagerFactory {
    static getManager(name) {
        switch(name) {
            case "product":
                return productManager
            case "cart":
                return cartManager
            case "chat":
                return chatMessageManager
            case "user":
                return userManager
            default:
                throw new Error("El manager no existe")
        }
    }
}

module.exports = ManagerFactory