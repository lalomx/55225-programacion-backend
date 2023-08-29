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
        jwt.verify(token, SECRET)
        return true
    } catch (e) {
        return false
    }
}

module.exports = {
    generateToken,
    authToken
}