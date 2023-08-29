const jwt = require('jsonwebtoken')

const SECRET = "verysecretpassword"

// creamos dos metodos aqui para generar el token apartir de un email o usuario
// y validar un token ya existente

const generateToken = (user) => {
    return jwt.sign(user, SECRET, {
        expiresIn: '24h',
    })
}

const authToken = (token) => {
    try {
        console.log('token', token)
        return jwt.verify(token, SECRET)
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = {
    generateToken,
    authToken
}