const bcrypt = require('bcrypt')

// se genera un has apartir de un salt
// un salt es un string de 10 caracteres que se genera random
// funcion irreversible
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// regresa true/false
const isValidPassword = (pwd1, pwd2) => bcrypt.compareSync(pwd1, pwd2)

module.exports = { hashPassword, isValidPassword }