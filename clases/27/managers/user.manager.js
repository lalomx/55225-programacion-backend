const userModel = require('../models/user.model')

class UserManager {

  async getAll() {
    return userModel.find({}).lean()
  }

  getById(id) {
    return userModel.findOne({ _id: id }).lean()
  }

  getByEmail(email) {
    console.log(email)
    return userModel.findOne({ email }).lean()
  }

  create(user) {
    return userModel.create(user)
  }

  async save(id, user) {
    if (!await this.getById(id)) {
      return
    }

    const {
      email,
      firstname,
      lastname,
      gender,
      age,
      password
    } = user

    await userModel.updateOne({ _id: id }, { 
      $set: {
        email,
        firstname,
        lastname,
        gender,
        age,
        password
      } 
    })
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
