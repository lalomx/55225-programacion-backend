const express = require('express')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require("socket.io");

const Routes = require('./routes/index.js')
const socketManager = require('./websocket')

const app = express() // app express
const server = http.createServer(app) // server http montado con express
const io = new Server(server) // web socket montado en el http

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
app.use('/api', (req, res, next) => {
  req.io = io
  next()
}, Routes.api)

// middlewares
// static files
// subir archivos estaticos 

// web socket
io.on('connection', socketManager)

const port = 3000

server.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})