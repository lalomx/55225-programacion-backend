const fs = require('fs/promises')
const path = require('path')

class UserManager {
  constructor(filename = 'usuarios.json') {
    this.filepath = path.join(__dirname, filename)
    this.users = null
  }

  async #readFile() {
    this.users = JSON.parse(await fs.readFile(this.filepath, 'utf-8'))
  }

  async addUser(user) {
    if (!this.usuarios) {
      await this.#readFile()
    }

    const id = this.users[this.users.length - 1]?.id || 0

    this.users.push({
      ...user,
      id: id + 1
    })

    await fs.writeFile(this.filepath, JSON.stringify(this.users, null, 2))
  }

  async getUsers() {
    if (!this.users) {
      await this.#readFile()
    }

    return this.users
  }
}

async function main() {
  const manager = new UserManager()
  let users = await manager.getUsers()

  console.log(users)

  await manager.addUser({
    nombre: 'lalo',
    apellido: 'velazquez',
    edad: 30,
    curso: 'backend'
  })

  users = await manager.getUsers()

  console.log(users)
}

main()