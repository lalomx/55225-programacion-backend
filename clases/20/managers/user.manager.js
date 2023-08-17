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
      age,
      password
    } = user

    await userModel.updateOne({ _id: id }, { $set: {
      email,
      firstname,
      lastname,
      username,
      gender,
      age,
      password
    } })
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
