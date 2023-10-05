const logger = require('../logger')

const fn = (req, _res, next) => {
  logger.http(`[${req.method}] - ${req.url} at ${(new Date()).toISOString()}`)
  next()
}

module.exports = fn