import mongoose from "mongoose"
import User from '../src/dao/Users.dao.js'
import Assert from "assert"

mongoose.connect('mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/mascotas?retryWrites=true&w=majority')
// crear un mock de la base de datos
// mongo in memory

const assert = Assert.strict

describe('User DAO', () => {
  // pruebas

  const userDao = new User()

  before(function () {
    console.log('before')
  })

  after(function () {
    mongoose.disconnect()
  })

  beforeEach(function () {
    this.timeout(5000)
  })

  afterEach(function() {
    console.log('after each')
  })

  it('obtener todos los usuarios en una lista', async function() {
    this.timeout(5000)
    const usuarios = await userDao.get()

    assert.strictEqual(Array.isArray(usuarios), true)
  })

  it('el dao registra un usuario', async function () {
    this.timeout(5000)
    const user = await userDao.save({
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan.perez@aol.com',
      password: '12345',
      role: 'Admin',
    })

    await userDao.delete({ _id: user._id })
    assert.ok(user)
    assert.deepStrictEqual(user.pets, [])
  })

  it('obtener un usuario por email', async function() {
    this.timeout(5000)

    const user = await userDao.getBy({ email: 'alguien@example.com'})

    assert.ok(user)
    assert.strictEqual(user.email, 'alguien@example.com')
  })
})