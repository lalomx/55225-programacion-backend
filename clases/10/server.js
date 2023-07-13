const express = require('express')
const Routes = require('./routes/index.js')
const path = require('path')
const handlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + '/public')))

/// middleware global
app.use((req, res, next) => {
  
  // simulando un usuario autenticado
  req.user = {
    name: "Jonh",
    role: "admin"
  }

  next()
})
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