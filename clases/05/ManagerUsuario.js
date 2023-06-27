const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

class ManagerUsuario {
  constructor(path) {
    this.filepath = path
  }

  async addUser(user) {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const users = JSON.parse(data)

    const newId = users[users.length - 1]?.id || 0 // conditional (ternary) operator
    const hashedPassword = this.hashPassword(user.password)

    users.push({
      ...user,
      id: newId + 1,
      password: hashedPassword
    })

    await fs.writeFile(this.filepath, JSON.stringify(users, null, 2))
  }

  async getUsers() {
    const data = await fs.readFile(this.filepath, 'utf-8')
    const users = JSON.parse(data)

    return users
  }

  hashPassword(pass) {
    if (!pass) {
      throw new Error('Password vacia')
    }
    const hash = crypto.createHash('sha256')
    hash.update(pass)

    return hash.digest('hex')
  }

  async login(username, pass) {
    const users = await this.getUsers()
    const user = users.find(u => u.username === username)

    if (!user) {
      return false
    }

    const { password } = user
    const hash = this.hashPassword(pass)

    return password === hash
  }
}

const manager = new ManagerUsuario(path.join(__dirname, 'usuarios.json'))

async function main() {
  // await manager.addUser({
  //   nombre: "lalo",
  //   apellido: "velazquez",
  //   edad: 30,
  //   curso: "backend",
  //   username: "lalomx",
  //   password: "hola123"
  // })

  // console.log(await manager.getUsers())

  const success = await manager.login("lalomx", "hola123")

  console.log(`El login fue: ${success}`)
}

main()
