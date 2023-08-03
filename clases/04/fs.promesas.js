const fs = require('fs/promises')
const path = require('path')
const filename = 'promesas.txt'
const filepath = path.join(__dirname, filename)

async function main() {
  try {
    await fs.writeFile(filepath, 'promisespromises')
    console.log('se ha escrito en el archivo')
    const data = await fs.readFile(filepath, 'utf-8')
    console.log('la data es', data)
    const masData = '\n\nmucha mas data'
    await fs.appendFile(filepath, masData, 'utf-8')
    console.log('se ha escrito mas data')
    await fs.unlink(filepath)
    console.log('se ha borrado el archivo promesas.txt')
  } catch {
    console.log('error')
  }

}

main()


// JavaScript Object Notation

// XML
