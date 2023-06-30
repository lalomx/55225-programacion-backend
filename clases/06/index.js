const http = require('http')

const server = http.createServer((req, res) => {
  console.log('aqui hay una peticion nueva')
  res.statusCode = 200

  res.end('Hola a todos en la clase')
})

const port = 3000
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


// http statuss code

// 200-299 OK
// 300 MOVED 
// 400 Req is invalid
// 500 Error en el server