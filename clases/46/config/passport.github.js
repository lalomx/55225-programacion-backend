const GitHubStrategy = require('passport-github2') // importamos la estrategia de github
const userManager = require('../managers/user.manager')

const CLIENT_ID = "AQUI VA EL CLIENTID"
const CLIENT_SECRET = "AQUI VA EL CLIENT SECRET"
const CALLBACK_URL = 'http://localhost:3000/api/auth/github/callback'

// el callback que la estrategia ejecuta cada que se
// intenta logear con github
const auth = async (accessToken, refreshToken, profile, done) => {

    // las variables accessToken y refreshToken son generadas por la app github
    // viene relacionado con JWT

    try {
        // en el argumento profile, viene toda la informacion que sacamos de github
        console.log(profile)

        // si el email es null es porque ell usuario debe de tener su email privado
        const { _json: { name, email } } = profile

        console.log(name, email)

        if (!email) {
            console.log('el usuario no tiene su email publico')
            return done(null, false)
        }

        // buscamos al usuario en la db
        let user = await userManager.getByEmail(email)

        if (!user) {
            // si el usuario no existe, lo creamos

            // sacamos el nombre y apellido del nombre de github
            // separados por un espacio
            const [ firstname, lastname] = name.split(' ')
            const _user = await userManager.create({
                firstname,
                lastname,
                email,
                age: 18,
                gender: 'Male'
            })

            // re asignamos la variable user con el documento de _user

            user = _user._doc
        }
        
        // la authentication fue exitosa a este punto
        done(null, user)
    } catch (e) {
        console.log(e)
        done(e, false)
    }

    

}

// instanciamos el handler para el login con github
const gitHubHandler = new GitHubStrategy(
    // primer parametro es un objeto options
    // con los datos de la pp de github que creamos
    {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL
    },
    auth
)


// importamos este handler para usarlo en passport.local
module.exports = gitHubHandler