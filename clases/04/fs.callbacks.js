const fs = require('fs')
const path = require('path')
const filename = 'data.txt'
const filepath = path.join(__dirname, filename)

console.log('inicio')

fs.writeFile(filepath, "DATADATADATA", (err) => {
  if (err) {
    console.log('no se pudo escribir el archivo')
  } else {
    console.log('el archivo se creo')
    fs.appendFile(filepath, "\n\nMASDATA", (err) => {
      if (err) {
        console.log('error en appendFile')
      } else {
        console.log('se ha agregado mas data')
        fs.readFile(filepath, 'utf-8', (err, data) => {
          if (err) {
            console.log('no se pudo leer el archivo')
          } else {
            console.log('data', data)
            fs.unlink(filepath, (err) => {
              if (err) {
                console.log('error al borrar el archivo')
              } else {
                console.log('el archivo se borro')
              }
            }) 
          }
        })
      }
    })
  }
})

console.log('fin')