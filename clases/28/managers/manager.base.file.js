const fs = require('fs/promises')
const path = require('path')

class BaseManager {
    #entities = []

    constructor(filename) {
        this.filename = filename
        this.filepath = path.join(__dirname, '../data',this.filename)
    }

    #readFile = async () => {
        const data = await fs.readFile(this.filepath, 'utf-8')
        this.#entities = JSON.parse(data)
    }

    #writeFile = async() => {
        const data = JSON.stringify(this.#entities, null, 2)
        await fs.writeFile(this.filepath, data)
    }

    async getAll() {
        await this.#readFile()

        return this.#entities
    }

    async getById(id) {
        await this.#readFile()

        return this.#entities.find(p => p.id == id)
    }

    async create(product) {
        await this.#readFile()

        const id = (this.#entities[this.#entities.length - 1]?.id || 0) + 1

        const newProduct = {
        ...product,
        id
        }

        this.#entities.push(newProduct)

        await this.#writeFile()

        return newProduct
    }

    async update (id, product) {
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

        this.#entities = this.#entities.filter(p => p.id != id)

        await this.#writeFile()
    }
}

module.exports = BaseManager