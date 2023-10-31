import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requestor = supertest('http://localhost:8080')


describe('Test User Avanzado', () => {
  let cookie
  it('debe de registar a un usuario', async () => {
    const mock = {
      first_name: 'Pedro',
      last_name: 'Almodovar',
      email: 'palmodovar@gmail.com',
      password: '123'
    }

    const { _body } =  await requestor.post('/api/sessions/register').send(mock)

    expect(_body.payload).to.be.ok
  })

  it('debe loguear al usuario', async () => {
    const login = {
      email: 'palmodovar@gmail.com',
      password: '123'
    }

    const result = await requestor.post('/api/sessions/login').send(login)
    const cookieResult = result.headers['set-cookie'][0]
    expect(cookieResult).to.be.ok
    cookie = {
      name: cookieResult.split('=')[0],
      value: cookieResult.split('=')[1]
    }

    expect(cookie.name).to.be.ok.and.equal('coderCookie')
  })

  it('debe obtener el usuario apartir de la cookie', async () => {
    const { _body } = await requestor.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
    expect(_body.payload.email).to.be.equal('palmodovar@gmail.com')
  })

  // unprotectedLogin
  // unprotectedCurrent
})