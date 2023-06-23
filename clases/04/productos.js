const fs = require('fs/promises')
const path = require('path')
const filename = 'productos.json'
const filepath = path.join(__dirname, filename)

// {
//   title, stock, precio
// }

async function main() {
  const data = await fs.readFile(filepath, 'utf-8')
  const productos = JSON.parse(data)

  productos[0].title = "Videojuego 1"
  // aqui puede haber mas cambios

  await fs.writeFile(filepath, JSON.stringify(productos, null, 2))
}

main()