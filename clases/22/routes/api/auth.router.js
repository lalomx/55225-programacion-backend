const { Router } = require('express')
const passport = require('passport')

const userManager = require('../../managers/user.manager')
const { generateToken } = require('../../utils/jwt.utils')
const { isValidPassword } = require('../../utils/password.utils')

const router = Router()

// este manejador es ejecutado cuando el user le da click a iniciar session con github
// passport ejecutara el login con la app de github y esta se abrira para que el usuario
// pueda meter sus datos y loguearse
router.get('/github', passport.authenticate('github', { scope: ['user:email']}),  (req, res) => {})


// una vez que el usuario se logueo en github
// es redirigido a nuestro callback para poder guardar la session
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login'}), 
    async (req, res) => {
        // se guarda la session del usuario
        req.session.user = req.user

        req.session.save((err) => {
            if (!err) {
                return res.redirect('/')
            }

            console.log(err)
            res.redirect('/login')
        })
    })

// creamos una ruta para authenticar usuarios de API
// mandamos un post request a /api/login
// para obtener un token que usaremos en las demas llamadas al api
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userManager.getByEmail(email)

        console.log(password, user)


        if (!user || !isValidPassword(password, user?.password)) {
            return res.send({
                status: 'failure',
                error: 'Failed login'
            })
        }

        const token =  generateToken(user)

        return res.send({
            status: 'success',
            message: token
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failure',
            error
        })
    }
})

module.exports = router