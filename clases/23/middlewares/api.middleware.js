const { authToken } = require('../utils/jwt.utils')


// Este middleware solo se ejecutara en las rutas de api
// esto para proteger nuestras api solo pa que los usuarios logueados puedan acceder a ellas
// el token debe de viajar en un header de http
// Authorization: Bearer TOKEN
// este se lee y se valida que sea correcto
const apiAuth = function (req, res, next) {
    const authHeader = req.headers.authorization

    console.log(authHeader)

    if (!authHeader) {
        return res.status(401).send({
            status: 'failure',
            error: 'Not logged in'
        })
    }

    const token = authHeader.replace('Bearer ', '')

    if (!authToken(token)) {
        return res.status(401).send({
            status: 'failure',
            error: 'Not authorized'
        })
    }

    next()
}

module.exports = apiAuth