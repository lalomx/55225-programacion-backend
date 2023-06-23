const fs = require('fs')
const path = require('path')
const filename = 'fecha.txt'
const filepath = path.join(__dirname, filename)

const getDate = () => {
  const date = new Date()
  return date.toISOString()
} // utc horario greenwich 

setInterval(() => {
  const data = getDate()
  fs.writeFile(filepath, data, 'utf-8', (err) => {
    console.log('la operacion termino. Error', err)
  })
}, 1 * 1000)
