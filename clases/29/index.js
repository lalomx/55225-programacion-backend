const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./config')
const router = require('./routes')


async function main() {
  const app = express()

  await mongoose.connect(config.MONGO_URL) 

  app.use(express.json())
  app.use(cors())
  app.use(router)

  app.use('*', (req, res) => res.status(404).send({ error: true, message: 'not found'}))
  
  app.listen(config.PORT, () => {
    console.log(`server is listening to http://localhost:${config.PORT}`)
  })
}

main()
