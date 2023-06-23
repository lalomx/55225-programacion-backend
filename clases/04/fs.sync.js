const fs = require('fs')
const path = require('path')
const filename = 'data.txt'
const filepath = path.join(__dirname, filename)

console.log('inicio')

fs.writeFileSync(filepath, '### INICIO ###')
fs.appendFileSync(filepath, '\n\nMAS DATA')

const data = fs.readFileSync(filepath, 'utf-8')

console.log(data)

// const exists = fs.existsSync(filepath)

// console.log('existe', exists)

// setTimeout(() => {
//   fs.unlinkSync(filepath)
//   const exists = fs.existsSync(filepath)

//   console.log('existe', exists)
// }, 4 * 1000)

fs.unlinkSync(filepath)
const exists = fs.existsSync(filepath)

console.log('existe', exists)

console.log('fin')

