import chai from 'chai'
import { createHash, passwordValidation } from '../src/utils/index.js'
import UserDTO from '../src/dto/User.dto.js'

const expect = chai.expect
const PASSWORD = '12345'
const HASH = '$2b$10$Nwt2bragAlSkvA5q88vwQOD/xMwLubjDv/uJGmDbsvyoqcgU8kbGe'
const USER = {
  first_name: 'Juan',
  last_name: 'Perez'
}

describe('', function() {

  it('debe hashear contraseña', async function() {
    const hash = await createHash(PASSWORD)

    expect(PASSWORD).to.not.equal(hash)
  })

  it('debe coincidir contra', async function() {
    const isPasswordOk = await passwordValidation({
      password: HASH
    }, PASSWORD)


    expect(isPasswordOk).to.be.true
  })


  it('NO debe coincidir contra', async function() {
    const isPasswordOk = await passwordValidation({
      password: 'cualquiercosaquenoeshash'
    }, PASSWORD)

    expect(isPasswordOk).not.to.be.true
  })

  it('debe unificar nombre', function(){

    const { name, first_name, last_name } =  UserDTO.getUserTokenFrom(USER)

    expect(name).to.be.equal('Juan Perez')
    expect(first_name).to.be.undefined
    expect(last_name).to.be.undefined
  })
})