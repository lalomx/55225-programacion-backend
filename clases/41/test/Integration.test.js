import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requestor = supertest('http://localhost:8080')

// Test integration
describe('Integration - Adoptme', () => {
  describe('Pet', () => {
    // suite de test para CRUD de mascotas
    let idMastota
    it('Pet - /POST - ok', async () => {
      const pet = {
        name: 'Bunny',
        specie: 'Rabbit',
        birthDate: '10-10-2021'
      }

      const { statusCode, ok, _body: { payload } } = await requestor.post('/api/pets').send(pet)

      idMastota = payload._id
      expect(payload.adopted).to.be.false
      expect(statusCode).to.be.equal(200)

      console.log(idMastota)
    })

    it('Pet - /POST - 400', async () => {
      const pet = {
        specie: 'Rabbit',
        birthDate: '10-10-2021'
      }

      const { statusCode } = await requestor.post('/api/pets').send(pet)

      expect(statusCode).to.be.equal(400)
    })

    it('Pet - /GET', async () => {
      const { _body: { status, payload }} = await requestor.get('/api/pets')

      expect(status).to.be.equal('success')
      expect(Array.isArray(payload)).to.be.true
    })

    it('Pet - /PUT', async () => {
      const pet = {
        name: 'Bunny',
        specie: 'Rabbit',
        birthDate: '10-10-2020',
        _id: idMastota
      }

      console.log(idMastota)

      const response = await requestor.put(`/api/pets/${pet._id}`).send(pet)
      
      expect(response.statusCode).to.be.equal(200)

      const { _body: { payload } } = await requestor.get(`/api/pets`)

      const petUpdated = payload.find(p => p._id == pet._id)

      expect(petUpdated).to.not.be.undefined
      // expect(petUpdated.birthDate).to.be.equal(pet.birthDate) // TODO: parsear la fecha para poder
      // compararla mas facil
    })

    it('Pet - /DELETE', async () => {
      const response = await requestor.del(`/api/pets/${idMastota}`)

      expect(response.statusCode).to.be.equal(200)

      const { _body: { payload } } = await requestor.get(`/api/pets`)

      const petDeleted = payload.find(p => p._id == idMastota)

      expect(petDeleted).to.be.undefined
    })
  })

  describe('User', () => {
    let cookie
    const user = {
      first_name: 'Ramon',
      last_name: 'Rios',
      email: 'rrios@gmail.com',
      password: '123'
    }
  
    it('User - /Registro', async () => {
      const { _body: { payload } } = await requestor.post('/api/sessions/register').send(user)
      
      expect(payload).to.be.ok
      // expect(payload.email).to.be.equal(user.email)
    })
    it('User - /Login', async () => {
      
      const { headers } = await requestor.post('/api/sessions/login').send({
        email: user.email,
        password: user.password
      }) 
      // Set-Cookie: [key=value, key2=value2]
      const cookieHeader = headers['set-cookie'][0]
      cookie = {
        name: cookieHeader.split('=')[0],
        value: cookieHeader.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.equal('coderCookie')
    })
    it('User - /Current', async () => {
      const { _body: { payload } } = await requestor.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

      expect(payload.email).to.be.equal(user.email)
      expect(payload.password).to.be.undefined
    })

    it('User - unProtectedLogin', async () => {
      const { headers } = await requestor.post('/api/sessions/unprotectedLogin').send({
        email: user.email,
        password: user.password
      }) 
      // Set-Cookie: [key=value, key2=value2]
      const cookieHeader = headers['set-cookie'][0]
      cookie = {
        name: cookieHeader.split('=')[0],
        value: cookieHeader.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.equal('unprotectedCookie')
    })

    it('User - /UnprotectedCurrent', async () => {
      const { _body: { payload } } = await requestor.get('/api/sessions/unprotectedCurrent').set('Cookie', [`${cookie.name}=${cookie.value}`])

      expect(payload.email).to.be.equal(user.email)
      expect(payload.password).to.not.be.undefined
    })
  })

  describe('Uploads', () => {
    it('debe crear una mascota con una imagen', async () => {
      const pet = {
        name: 'Bunny',
        specie: 'Rabbit',
        birthDate: '10-10-2021'
      }

      const { statusCode, _body: { payload } } = await requestor.post('/api/pets/withimage')
      .field('name', pet.name)
      .field('specie', pet.specie)
      .field('birthDate', pet.birthDate)
      .attach('image', './test/rabbit.jpg')

      expect(statusCode).to.be.equal(200)
      expect(payload).to.have.property('_id')
      expect(payload.image).to.be.ok
    })
  })
})