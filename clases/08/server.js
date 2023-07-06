const express = require('express')
const Routes = require('./routes/index.js')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + 'public')))
// cookie
// passport
// template engines
// entre otros

// app.get('/api/usuarios', (req, res) => {
//   res.send('usuarios')
// })



// router
app.use('/', Routes.home)
app.use('/api', Routes.api)

// middlewares
// static files
// subir archivos estaticos 

const port = 3000

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})