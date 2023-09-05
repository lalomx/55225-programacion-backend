const dotenv = require('dotenv')

let environment = 'dev'

const envInput = process.argv.slice(2)[0] || environment

dotenv.config({
  path: envInput === 'dev' ? './.env.dev' : './.env.prod'
})

const config = require('./config/config')

// console.log(process)
// console.log(process.cwd())
// console.log(process.pid)
// console.log(process.memoryUsage())
// console.log(process.env)

// console.log(process.version)

process.on('uncaughtException', (err) => {
  console.log('el programa acabo inesperadamente', err)
})

// console()

