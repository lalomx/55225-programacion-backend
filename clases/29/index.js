const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { PORT, MONGO_URL } = require('./config')
const router = require('./routes')

async function main() {
  await mongoose.connect(MONGO_URL)

  const app = express()
  
  app.use(express.json())
  app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT"] }))
  app.use(router)
  app.use('*', (req, res) => res.status(404).send({ success: false, error: 'not found' }))
  app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
}

main()