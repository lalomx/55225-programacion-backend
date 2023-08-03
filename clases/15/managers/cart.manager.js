const fs = require('fs/promises')
const path = require('path')

class CartManager {

  #cartMap = []

  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, '../data',this.filename)
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.#cartMap = JSON.parse(data)
  }

  #writeFile = async() => {
    const data = JSON.stringify(this.#cartMap, null, 2)
    await fs.writeFile(this.filepath, data)
  }

  async create(userId) {
    await this.#readFile()

    this.#cartMap[userId] = { products: [] }

    await this.#writeFile()
  }

  async addProduct(userId, productId) {
    await this.#readFile()

    const cart = this.#cartMap[userId] || { products: [] }

    cart.products.push(productId)

    this.#cartMap[userId] = cart

    await this.#writeFile()
  }

  async getProductsByUserId(userId) {
    await this.#readFile()

    const cart = this.#cartMap[userId]

    if (!cart) {
      return []
    }

    return cart.products
  }
}

module.exports = CartManager
