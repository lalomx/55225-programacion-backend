const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

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
    
    const password = this.hashPassword(user.password)

    this.users.push({
      ...user,
      password,
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

  hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  async validaUsuario (username, pass) {
    const users = await this.getUsers()
    const user = users.find(u => u.username === username)

    if (!user) {
      return false
    }

    const hashedPass = this.hashPassword(pass)

    return user.password === hashedPass
  }
}

async function main() {
  const manager = new UserManager()
//   let users = await manager.getUsers()

//   console.log(users)

//   await manager.addUser({
//     nombre: 'lalo',
//     apellido: 'velazquez',
//     edad: 30,
//     curso: 'backend',
//     username: 'lalomx',
//     password: 'hola123'
//   })

//   users = await manager.getUsers()

//   console.log(users)

if (await manager.validaUsuario('lalomx', 'hola123')) {
  console.log('contrasena correcta')
} else {
  console.log('contrasena incorrecta')
}
}

main()