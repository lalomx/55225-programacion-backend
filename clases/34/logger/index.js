const winston = require('winston')
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
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    debug: 'white'
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(
        winston.format.colorize({ colors: options.colors }),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'warn',
      format: winston.format.simple()
    })
  ]
})

module.exports = logger