const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const isValidPassword = (pwd1, pwd2) => {
  return bcrypt.compareSync(pwd1, pwd2)
}

module.exports = { hashPassword, isValidPassword }