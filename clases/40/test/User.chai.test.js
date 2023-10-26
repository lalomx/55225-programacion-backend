import mongoose from "mongoose"
import User from '../src/dao/Users.dao.js'
import Assert from "assert"
import chai from 'chai'

mongoose.connect('mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/mascotas?retryWrites=true&w=majority')
// crear un mock de la base de datos
// mongo in memory

// const assert = Assert.strict
const expect = chai.expect

describe('User DAO con chai', () => {
  // pruebas

  const userDao = new User()
  let id = null

  before(function () {
    console.log('before')
  })

  after(async function () {
    // mongoose.connection.db.users.drop()
    await userDao.delete({ _id: id })
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

    // assert.strictEqual(Array.isArray(usuarios), true)
    expect(usuarios).to.deep.equal([])
  })

  it('el dao registra un usuario', async function () {
    this.timeout(5000)
    // const user = null
    const user = await userDao.save({
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan.perez@aol.com',
      password: '12345',
      role: 'Admin',
    })

    id = user._id

    // await userDao.delete({ _id: user._id })

    // assert.ok(user)
    // assert.deepStrictEqual(user.pets, [])

    expect(user).to.be.an('object')
  })

  it('obtener un usuario por email', async function() {
    this.timeout(5000)

    const user = await userDao.getBy({ email: 'juan.perez@aol.com'})

    // assert.ok(user)
    // assert.strictEqual(user.email, 'alguien@example.com')

    expect(user).to.be.an('object')
    expect(user.email).to.be.equal('juan.perez@aol.com')
  })
})