import fs from 'fs/promises'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {

  constructor(filename) {
    this.filename = filename
    this.filepath = path.join(__dirname, this.filename)
    this.products = []

    // propiedades
  }

  async getProducts() {
    const data = await fs.readFile(this.filepath, 'utf-8')
    console.log(data.length)
    this.products = JSON.parse(data)

    console.log(this.products.length)

    return this.products
  }
}

// exporto la clase ProductManager
export default ProductManager

// import from
// export 