import chai from 'chai'
import { createHash, passwordValidation } from '../src/utils/index.js'
import userDTO from '../src/dto/User.dto.js'

const expect = chai.expect
const PASSWORD = '12345'
const user = {
  first_name: 'Juan',
  last_name: 'Perez'
}

describe('probando mas funcionalidades', function() {

  it('debe hashear la contraseña', async function() {
    const hash = await createHash(PASSWORD)

    expect(PASSWORD).to.not.equal(hash)
  })

  it('debe coincidir la contraseña', async () => {
    const hash = await createHash(PASSWORD)
    
    const result = await passwordValidation({
      password: hash
    }, PASSWORD)

    expect(result).to.be.ok
  })

  it('no debe de coincidir la contraseña', async () => {
    const hash = await createHash(PASSWORD)

    const result = await passwordValidation({
      password: `AA${hash}`
    }, PASSWORD)

    expect(result).to.not.be.ok
  })

  it('debe unificar el nombre', () => {
    const { name, first_name, last_name } = userDTO.getUserTokenFrom(user)

    expect(name).to.be.equal('Juan Perez')
    expect(first_name).to.be.undefined
    expect(last_name).to.be.undefined
  })

})