const express = require('express')
const { api, home } = require('./routes')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// /Users/lalovelazquez/projects/coderhouse/55225/55225-programacion-backend/clases/08/public
app.use('/static', express.static(path.join(__dirname, 'public')))
// cookie
// passport
// template engines
// entre otros

// router
app.use('/', home) // vistas
app.use('/api', api)


// middlewares
// static files
// subir archivos estaticos 

const port = 3000

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})