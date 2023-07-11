const fs = require('fs/promises')
const path = require('path')

class ProductManager {

  #users = []

  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, '../data',this.filename)
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, 'utf-8')
    this.#users = JSON.parse(data)
  }

  #writeFile = async() => {
    const data = JSON.stringify(this.#users, null, 2)
    await fs.writeFile(this.filepath, data)
  }

  async getAll() {
    await this.#readFile()

    return this.#users
  }

  async getById(id) {
    await this.#readFile()

    return this.#users.find(p => p.id == id)
  }

  async create(user) {
    await this.#readFile()

    const id = (this.#users[this.#users.length - 1]?.id || 0) + 1

    const newUser = {
      ...user,
      id
    }

    this.#users.push(newUser)

    await this.#writeFile()

    return newUser
  }

  async save(id, user) {
    await this.#readFile()

    const existing = await this.getById(id)

    if (!existing) {
      return
    }

    const {
      email,
      firstname,
      lastname,
      username
    } = user

    existing.email = email
    existing.firstname = firstname
    existing.lastname = lastname
    existing.username = username

    await this.#writeFile()
  }

  async delete(id) {
    await this.#readFile()

    this.#users = this.#users.filter(p => p.id != id)

    await this.#writeFile()
  }
}

module.exports = ProductManager
