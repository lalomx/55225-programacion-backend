const jwt = require('passport-jwt')
const { authToken } = require('../utils/jwt.utils')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const handler = (token, done) => {
    console.log(token)
    try {
        if(!authToken(token)) {
            done(null, false, 'El token es invalido')
        } else {
            done(null, token)
        }
    } catch (e) {
        console.log('error', e)
        done(e)
    }
}

const extractor = (req) => {
    if(!req) return null
    if(!req.cookies) return null

    return req.cookies['jwtToken']
}

const strategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([extractor]),
    secretOrKey: 'verysecretpassword'
}, handler)


module.exports = strategy