const passport = require('passport')
const local = require('passport-local')
const userManager = require('../managers/user.manager')
const { hashPassword, isValidPassword } = require('../utils')

const LocalStrategy = local.Strategy

const register = async (req, username, password, done) => {
    const { email, ...userParams } = req.body
    try {
        const user = await userManager.getByEmail(email)

        if (user) {
            console.log('el usuario ya existe')
            return done(null, false)
        }

        const newUser = await userManager.create({
            ...userParams,
            password: hashPassword(user.password),
        })

        // crear el carrito del usuario (vacio)
        // implementar express-flash

        return done(null, {
            name: newUser.firstname,
            id: newUser._id,
            ...newUser._doc
        })
    } catch(e) {
        console.log(e)
        done(e, false)
    }
}

const login = async (email, password, done) => {
    try {
        const user = await userManager.getByEmail(email)
        if (!user) {
          return done(null, false, { message: 'user does not exist!' })
        }
  
        if (!user.password || !password || !isValidPassword(password, user.password)) {
          return done(null, false, { error: 'Contraseña invalida' })

        }
  
        return done(null, user)
      } catch (err) {
        return done(err)
      }
}

const init = () => {
    passport.use('local-login', new LocalStrategy({ usernameField: 'email' }, login))
    passport.use('local-register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, register))

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) =>
        done(null, await userManager.getById(id))
    )
}

module.exports = init