import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requestor = supertest('http://localhost:8080')

describe('Testing adoptme', () => {
  describe('Pet',() => {
    // it('debe crear una mascota /POST', async () => {
    //   const body = {
    //     name: 'Migi',
    //     specie: 'Cat',
    //     birthDate: '10-10-2022'
    //   }

    //   const { statusCode, ok, _body: { payload } } = await requestor.post('/api/pets')
    //     .send(body)

    //   console.log(statusCode, ok, _body)

    //   // expect(payload.adopted).to.be.false
    //   // expect(statusCode).to.be.equal(400)
    //   // get the latestId and use it next
    // })

    // it('debe obtener todas las macotas /GET', async () => {

    //   const { statusCode, ok, _body } = await requestor.get('/api/pets')

    //   console.log(statusCode, ok, _body)

    //   // expect(payload.adopted).to.be.false
    //   // expect(statusCode).to.be.equal(400)
    // })

    it('debe modificar una mascota /PUT', async () => {

      // id 6541052cf4a136d058c815a3
      const body = {
        id: '6541052cf4a136d058c815a3',
        name: 'Migi',
        specie: 'Cat',
        birthDate: '10-10-2023'
      }

      const { statusCode, ok, _body } = await requestor.put('/api/pets/6541052cf4a136d058c815a3')
      .send(body)

      console.log(statusCode, ok, _body)

      // expect(payload.adopted).to.be.false
      // expect(statusCode).to.be.equal(400)
    })

    it('debe borrar una mascota /DELETE', async () => {
      const { statusCode, ok, _body } = await requestor.delete('/api/pets/6541052cf4a136d058c815a3')

      console.log(statusCode, ok, _body)

      // expect(payload.adopted).to.be.false
      // expect(statusCode).to.be.equal(400)
    })
  })
})