const fs = require('fs/promises')
const path = require('path')

const filename = 'data.txt'
const filepath = path.join(__dirname, filename)
const getDate = () => (new Date()).toISOString()

async function main() {
  console.time('fs')

  await fs.writeFile(filepath, '### INICIO ###')
  const data = await fs.readFile(filepath, 'utf-8')
  
  await fs.writeFile(filepath, `${data}\nhola`)
  const nuevaData = `
  
  ## Otro dia ##
  ${getDate()}
  `
  await fs.appendFile(filepath, nuevaData)
  await fs.unlink(filepath)
  
  console.timeEnd('fs')
}

main()