class Repository {
  constructor(model) {
    this.model = model
  }

  getAll(filter = {}) {
    return this.model.find({})
  }

  getById(id) {
    return this.model.findOne({ _id: id })
  }

  create(obj) {
    return this.model.create(obj)
  }
}

module.exports = Repository