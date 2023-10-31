import mongoose from 'mongoose'
import chai from 'chai'
import User from '../src/dao/Users.dao.js'

const expect = chai.expect

mongoose.connect('mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/mascotas?retryWrites=true&w=majority')


describe('Test DAO Users', () => {
  before(function () {
    this.userDao = new User()
  })

  afterEach(async function() {
    if (!this.userId) return
    await this.userDao.delete(this.userId)
  })

  after(function () {
    mongoose.disconnect()
  })

  beforeEach(function () {
    this.timeout = 5000
  })

  it('el dao obtiene los resultados en un arreglo', async function () {
    const result = await this.userDao.get()
    expect(result).to.be.an('array')
  })

  it('el dao registra un usuario', async function () {
    const user = await this.userDao.save({
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan.perez@aol.com',
      password: '12345',
      role: 'Admin',
    })

    this.userId = user._id

    expect(user).to.be.an('object')
  })

  it('el dao obtiene un usuario por email', async function () {
    const user = await this.userDao.getBy({
      email: 'alguien@example.com'
    })

    expect(user).to.be.an('object')
  })
})