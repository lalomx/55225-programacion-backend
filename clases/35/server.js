// IIFE Immediate Invoke Function Expression
(async () => {
  const { Command } = require('commander')
  // const logger = require('coder55225')

  const program = new Command()

  program.option('-e, --env <env>', 'Entorno de ejecucion', 'development')
  program.parse()

  const { env } = program.opts()
  const path = require('path')
  // const dotenv = require('dotenv')
  
  // dotenv.config()/

  const http = require('http')
  

  const express = require('express')
  const handlebars = require('express-handlebars')
  const { Server } = require("socket.io");
  const MongoDbService = require('./services/mongo.db')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  const compression = require('express-compression')
  // const fileStore = require('session-file-store')
  const MongoStore = require('connect-mongo')
  const passport = require('passport')
  const cors = require('cors')

  const config = require('./config/config')
  const Routes = require('./routes/index.js')
  const socketManager = require('./websocket')
  const logger = require('./logger')
  const initPassportLocal = require('./config/passport.local.config.js')
  const loggerMiddleware = require('./middlewares/logger.middleare')

  // console.log(config)

  try {
    // conectar la base de datos antes de levantar el server
    // ${SCHEMA}://{USER}:{PASSWORD}@{HOSTNAME}:${PORT}/${DATABASE} -> LOCAL mongodb://localhost:27017/ecommerce
    // mongoose.connect("mongodb://localhost:27017/ecommerce")
    
    logger.warn('conectando a la DB')
    const mongoService = MongoDbService.getInstance()
    // console.log('el ID del singleton', mongoService.id)
    const connection = mongoService.connection
    await connection

    const app = express() // app express
    const server = http.createServer(app) // server http montado con express
    const io = new Server(server) // web socket montado en el http
    // const FileStore = fileStore(session)

    app.use(loggerMiddleware)
    app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
    app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
    app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas
    app.use(compression({
      brotli: { enabled: true, zlib: {}}, 
    }))
    app.use(express.urlencoded({ extended: true })) // para poder parsear el body y los query params
    app.use(express.json())

    app.use(cors())
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

    // registro de los middlewares de passport
    initPassportLocal()
    
    app.use(passport.initialize())
    app.use(passport.session())
    

    /// middleware global
    app.use((req, res, next) => {

      // console.log(req.cookies) // leer las cookies
      // console.log(req.signedCookies)

      console.log(req.session, req.user)
      next()

      // const { user } = req.cookies
      
      // simulando un usuario autenticado
      // {
      //   user: {
      //     name
      //   }
      // }
      })

    //   next()
    // })
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
    // io.on('connection', socketManager)

    app.use((err, req, res, next) => {
      logger.error('error!!')
      logger.error(err.message)
    
      res.send({
        success: false,
        error: err.stack
      })
    })

    const port = process.env.PORT || 8080

    server.listen(port, () => {
      logger.info(`Express Server listening at http://localhost:${port}`)
    })

    logger.debug('se ha conectado a la base de datos')
  } catch(e) {
    logger.error('no se ha podido conectar a la base de datos')
  }
})()

