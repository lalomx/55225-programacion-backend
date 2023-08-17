// IIFE Immediate Invoke Function Expression
(async () => {
  const http = require('http')
  const path = require('path')

  const express = require('express')
  const handlebars = require('express-handlebars')
  const { Server } = require("socket.io");
  const mongoose = require('mongoose')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  // const fileStore = require('session-file-store')
  const MongoStore = require('connect-mongo')
  const passport = require('passport')
  const initPassport = require('./config/passport.config')

  const Routes = require('./routes/index.js')
  const socketManager = require('./websocket')

  try {
    // conectar la base de datos antes de levantar el server
    // ${SCHEMA}://{USER}:{PASSWORD}@{HOSTNAME}:${PORT}/${DATABASE} -> LOCAL mongodb://localhost:27017/ecommerce
    // mongoose.connect("mongodb://localhost:27017/ecommerce")
    await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")

    const app = express() // app express
    const server = http.createServer(app) // server http montado con express
    const io = new Server(server) // web socket montado en el http
    // const FileStore = fileStore(session)

    app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
    app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
    app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas

    app.use(express.urlencoded({ extended: true })) // para poder parsear el body y los query params
    app.use(express.json())
    app.use('/static', express.static(path.join(__dirname + '/public')))
    app.use(cookieParser('esunsecreto'))
    
    app.use(session({
      secret: 'esunsecreto',
      resave: true,
      saveUninitialized: true,
      // store: ''
      // store: new FileStore({ path: './sessions', ttl: 100, retries: 0 }),
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl: 60 * 60
      })
    }))

    initPassport()
    app.use(passport.initialize())
    app.use(passport.session())
    

    /// middleware global
    app.use((req, res, next) => {

      // console.log(req.cookies) // leer las cookies
      // console.log(req.signedCookies)

      console.log(req.session, req.user)

      // const { user } = req.cookies
      
      // simulando un usuario autenticado
      // {
      //   user: {
      //     name
      //   }
      // }
      // if (req.session?.user) {
      //   req.user = {
      //     name: req.session.user.name,
      //     role: "admin"
      //   }
      // }

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

    console.log('se ha conectado a la base de datos')
  } catch(e) {
    console.log('no se ha podido conectar a la base de datos')
    console.log(e)
  }
})()

