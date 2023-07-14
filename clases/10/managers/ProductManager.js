const fs = require('fs/promises')
const path = require('path')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class ProductManager {

  #products = []

  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, '../data',this.filename)
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.#products = JSON.parse(data)
  }

  #writeFile = async() => {
    const data = JSON.stringify(this.#products, null, 2)
    await fs.writeFile(this.filepath, data)
  }

  async getAll() {
    await this.#readFile()

    return this.#products
  }

  async getById(id) {
    await this.#readFile()

    return this.#products.find(p => p.id == id)
  }

  async create(product) {
    await this.#readFile()

    const id = (this.#products[this.#products.length - 1]?.id || 0) + 1

    const newProduct = {
      ...product,
      id
    }

    this.#products.push(newProduct)

    await this.#writeFile()

    return newProduct
  }

  async save(id, product) {
    await this.#readFile()

    const existing = await this.getById(id)

    if (!existing) {
      return
    }

    const {
      title,
      description,
      stock,
      price,
      keywords
    } = product

    existing.title = title
    existing.description = description
    existing.stock = stock
    existing.price = price
    existing.keywords = keywords

    await this.#writeFile()
  }

  async delete(id) {
    await this.#readFile()

    this.#products = this.#products.filter(p => p.id != id)

    await this.#writeFile()
  }

  async getRandom() {
    await this.#readFile()

    const randomId = getRandomNumber(0, this.#products.length - 1)
    return this.#products[randomId]
  }
}

module.exports = ProductManager
