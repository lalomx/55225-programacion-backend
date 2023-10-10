const config = require('../config/config')
const { 
  createLogger, 
  transports: { Console, File },
  format: { combine, colorize, simple }
} = require('winston')

const options = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    debug: 'white'
  }
}

const logger = createLogger({
  transports: [
    new Console({
      level: config.CONSOLE_LOG_LEVEL,
      format: combine(
        colorize({ colors: options.colors }),
        simple()
      )
    }),
    new File({
      filename: './logs/error.log',
      level: config.FILE_LOG_LEVEL,
      format: simple()
    })
  ]
})

// logger.info
// logger.error
// logger.http

module.exports = logger