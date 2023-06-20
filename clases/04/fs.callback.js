const fs = require('fs')
const path = require('path')

const filename = 'data.txt'
const filepath = path.join(__dirname, filename)
const getDate = () => (new Date()).toISOString()
const nuevaData = `
## Otro dia ##
${getDate()}
`

console.time('fs')
fs.writeFile(filepath, '### INICIO ###', (err) => {
  console.log('se creo el archivo de inicio')
  fs.readFile(filepath, 'utf-8', (err, data) => {
    console.log('hemos leido el archivo')
    fs.writeFile(filepath, `${data}\nhola`, (err) => {
      console.log('agregamos mas data')
      fs.appendFile(filepath, nuevaData, (err) => {
        console.log('maaaas data')
        fs.unlink(filepath, (err) => {
          console.log('hemos borrado el archivo')
          console.timeEnd('fs')
        })
      })
    })
  })
})

// console.timeEnd('fs')