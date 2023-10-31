import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requestor = supertest('http://localhost:8080')

describe('Test uploads', () => {
  it('debe crearse una mascota con la ruta de la imagen', async () => {
    const pet = {
      name: 'Bunny',
      specie: 'Rabbit',
      birthDate: '10-11-2023'
    }

    const result = await requestor.post('/api/pets/withimage')
    .field('name', pet.name)
    .field('specie', pet.specie)
    .field('birthDate', pet.birthDate)
    .attach('image', './test/rabbit.jpg')

    expect(result.status).to.be.equal(200)
    expect(result._body.payload).to.have.property('_id')
    expect(result._body.payload.image).to.be.ok
  })
})