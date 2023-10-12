const dotenv = require('dotenv')
const express = require('express')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(process.env.PORT || 3000, () => console.log('servidor escuchando'))