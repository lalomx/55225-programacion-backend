const userModel = require('../models/user.model')

class UserManager {

  async getAll() {
    return userModel.find({}).lean()
  }

  getById(id) {
    return userModel.find({ _id: id }).lean()
  }

  getByEmail(email) {
    console.log(email)
    return userModel.findOne({ email }).lean()
  }

  create(user) {
    return userModel.create(user)
  }

  async save(id, user) {
    const existing = await this.getById(id)

    if (!existing) {
      return
    }

    const {
      email,
      firstname,
      lastname,
      username,
      gender,
      age
    } = user

    existing.email = email
    existing.firstname = firstname
    existing.lastname = lastname
    existing.username = username
    existing.gender = gender
    existing.age = age

    await existing.updateOne({ _id, existing: _id }, existing)
  }

  async delete(id) {
    const existing = await this.getById(id)

    if (!existing) {
      return
    }

    /// operadores

    await userModel.deleteOne({ _id: id })
  }
}

module.exports = new UserManager()
