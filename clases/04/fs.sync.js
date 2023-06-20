const fs = require('fs')
const path = require('path')

const filename = 'data.txt'
const filepath = path.join(__dirname, filename)
const getDate = () => (new Date()).toISOString()

console.time('fs')

fs.writeFileSync(filepath, '### INICIO ###')
const data = fs.readFileSync(filepath)
fs.writeFileSync(filepath, `${data}\nhola`)
const nuevaData = `

## Otro dia ##
${getDate()}
`
fs.appendFileSync(filepath, nuevaData)
fs.unlinkSync(filepath)
const existe = fs.existsSync(filepath)
if(!existe) {
  console.log('el archivo ha sido borrado')
}

console.timeEnd('fs')