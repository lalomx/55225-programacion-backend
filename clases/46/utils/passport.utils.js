const passport = require('passport')

const usePassportStrategy = (strategy, opts = {}) => {
    return (req, res, next) => {
        const auth = passport.authenticate(strategy, opts, (err, user, info) => {
            // aqui hago el tratamiento de los errores
            // una vez que el metodo done se ejecuta, cae aqui
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({
                    error: info,
                    success: 'failure'
                })
            }
        })

        auth(req, res, next)
    }
}