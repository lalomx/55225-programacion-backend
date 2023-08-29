const model = require('../models/cart.model')

class CartManager {

  getAll() {
    return model.find({}).lean()
  }

  getAllPaged(page = 1, limit = 5) {
    return model.paginate({}, { limit, page, lean: true })
  }

  async getById(id) {
    const entities = await model.find({ _id: id })

    return entities[0]
  }

  async create(body) {
    return model.create(body)
  }

  async update(id, entities) {
    const result = await model.updateOne({ _id: id }, entities)

    return result
  }

  async delete(id) {
    const result = await model.deleteOne({ _id: id })

    return result
  }
  
  async addProductToCart(cartId, productId) {
    const cart = await model.findOne({ _id: cartId })

    if (!cart) {
      return false
    }

    if (!cart.products.length) {
      cart.products.push({ product: productId, qty: 1 })
    } else {
      const product = cart.products.find(({ product }) => product == productId)
      product.qty++
    }

    console.log(cart)


    await cart.save()

    return true
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await model.findOne({ _id: cartId })

    if (!cart) {
      return false
    }

    if (!cart.products.length) {
      return false
    } 

    const product = cart.products.find(({ product }) => product == productId)
    product.qty--

    if (product.qty == 0) {
      cart.products =  cart.products.filter(({ product }) => product != productId)
    }

    await cart.save()

    return true
  }
}

module.exports = new CartManager()
