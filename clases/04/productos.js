const fs = require('fs/promises')
const path = require('path')

const filename = 'productos.json'
const filepath = path.join(__dirname, filename)

async function main() {
  const data = await fs.readFile(filepath, 'utf8')
  const producto = JSON.parse(data)

  producto.precio = 34
  producto.sku = "AAAA000123"
  producto.currency = "USD"

  console.log(JSON.stringify(producto))

  await fs.writeFile(filepath, JSON.stringify(producto, null, 2))
}

main()