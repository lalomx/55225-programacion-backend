const fs = require('fs/promises')
const path = require('path')

class ManagerUsuario {
  constructor(path) {
    this.filepath = path
  }

  async addUser(user) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const users = JSON.parse(data)

    const newId = users[users.length - 1]?.id || 0 // conditional (ternary) operator

    console.log(newId)

    users.push({
      ...user,
      id: newId + 1
    })

    await fs.writeFile(this.filepath, JSON.stringify(users, null, 2))
  }

  async getUsers() {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const users = JSON.parse(data)

    return users
  }
}

const manager = new ManagerUsuario(path.join(__dirname, 'usuarios.json'))

async function main() {
  console.log(await manager.getUsers())

  await manager.addUser({
    nombre: "lalo",
    apellido: "velazquez",
    edad: 30,
    curso: "backend"
  })

  console.log(await manager.getUsers())
}

main()
