class BaseManager {
    #model

    constructor(model) {
        this.#model = model
    }

    getAll() {
        return this.#model .find().lean()
      }
    
    getAllPaged(page = 1, limit = 5) {
    return this.#model .paginate({}, { limit, page, lean: true })
    }

    async getById(id) {
    const entities = await this.#model .find({ _id: id })

    return entities[0]
    }

    async create(body) {
    return this.#model .create(body)
    }

    async update(id, product) {
    const result = await this.#model .updateOne({ _id: id }, product)

    return result
    }

    async delete(id) {
    const result = await this.#model .deleteOne({ _id: id })

    return result
    }
}

module.exports = BaseManager