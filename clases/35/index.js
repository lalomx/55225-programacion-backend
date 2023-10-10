const cluster = require('cluster')
const { cpus } = require('os')
const express = require('express')

if(cluster.isPrimary) {
  console.log('Proceso primario')
  const numCpus = cpus().length
  console.log(numCpus)
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.id} died`);
    cluster.fork()
    // chequear num de cpus y numero de workers
  });

} else {
  console.log(`Proceso secundario, worker con ID ${process.pid}`)
  const app = express()

  app.get('/', (req, res) => res.send({ success: true, message: 'hola desde un worker'}))

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
  app.listen(8080, () => console.log('servidor escuchando'))
}