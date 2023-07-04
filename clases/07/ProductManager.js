import fs from 'fs/promises'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {

  #products = []

  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, this.filename)
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    console.log(data.length)
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

  /// funcion que escriba datos

  async create(product) {

    await this.#readFile()

    const id = (this.#products[this.#products.length - 1]?.id || 0) + 1
    const newProduct = {
      ...product,
      id
    }
    this.#products.push(newProduct)

    await this.writeFile()

    return newProduct
  }

  async save(id, product) {
    await this.#readFile()

    const existing = await this.getById(id)

    const { 
      title,
      description,
      price,
      stock,
      keywords
    } = product

    existing.title = title
    existing.description = description
    existing.stock = stock
    existing.keywords = keywords
    existing.price = price

    this.#writeFile()
  }

  async delete(id) {
    await this.#readFile()

    this.#products = this.#products.filter(p => p.id != id) 

    await this.#writeFile()
  }
}

// exporto la clase ProductManager
export default ProductManager

// import from
// export 