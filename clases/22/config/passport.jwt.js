const jwt = require('passport-jwt')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const handler = (payload, done) => {
    try {
        return done(null, payload)
    } catch (err) {
        return done(err)
    }
}

const cookieExtractor = req => {
    let token;

    if (req && req.cookies) {
        token = req.cookies['jwtCookie']
    }

    return token
}

const jwtPassport = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'secret'
}, handler)


module.exports = jwtPassport