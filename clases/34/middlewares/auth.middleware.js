const logger = require('../logger')

function isAuth(req, res, next) {
  if (req.user) {
    next()
    return
  }

  logger.warn('Usuario no autenticado!')

  res.redirect('/login')
}

module.exports = isAuth