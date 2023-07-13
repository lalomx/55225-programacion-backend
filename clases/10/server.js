const http = require('http')
const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require("socket.io");

const Routes = require('./routes/index.js')
const ProductManager = require('./managers/ProductManager.js')

const app = express()
const server = http.createServer(app)
const io = new Server(server);
const productManager = new ProductManager('productos.json')

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

// web socket management
io.on('connection', (socket) => {
  console.log(`nuevo usuario conectado ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });

  setTimeout( async () => {
    const videogame = await productManager.getRandom()
    socket.emit('promo', { title: videogame.title, sale: 20 })
  }, 700)
  
  

  socket.on('promo', () => {
    setTimeout( async () => {
      const videogame = await productManager.getRandom()
      socket.emit('promo', { title: videogame.title, sale: 20 })
    }, 700)
  })
  
})

const port = 3000

server.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})