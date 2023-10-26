const cluster = require('cluster')
const os = require('os')
const express = require('express')

if(cluster.isPrimary) {
  // fork
  
  console.log(`Hola soy el proceso primario y este es mi ID: ${process.pid}`)
  for (let i = 0; i < os.cpus().length; i++ ) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    // console.log(JSON.stringify(worker, null, 2))
    console.log(`El worker con ID ${worker.process.pid} ha sido detenido`)
    cluster.fork()
  })
} else {
  // worker
  console.log(`Hola soy un worker y este es mi ID: ${process.pid}`)
  const app = express()
  app.get('/', (req, res) => res.send(`Te atendio el worker ID: ${process.pid}`))

  app.get('/simple', (req, res) => {
    let sum = 0
  
    for (let i = 0; i < 10000; i++) {
      sum += i
    }
  
    res.send({ sum })
  })

  app.get('/compleja', (req, res) => {
    let sum = 0
  
    for (let i = 0; i < 5e8; i++) {
      sum += i
    }
  
    res.send({ sum })
  })


  app.listen(8080, () => console.log('escuchando'))
}
