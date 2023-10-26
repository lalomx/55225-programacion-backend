
class ProductDTO {

  constructor(body) {
    this.title = body.name
  }

  toObj() {
    return {
      title: this.title,
      // aqui mas propiedades
      // description: String,
      // price: Number,
      // keywords: [String],
      // stock: { type: Number, default: 0 },
      // createdDate: { type: Number, default: Date.now() }
    }
  }
}

module.exports = ProductDTO