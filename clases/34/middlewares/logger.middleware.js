const logger = require('../logger')

module.exports = (req, res, next) => {
  logger.http(`[${req.method}] ${req.url} - ${(new Date()).toISOString()}`)
  next()
}