const ProductManager = require('../managers/ProductManager.js')
const CartManager = require('../managers/CartManager.js')
const productManager = new ProductManager('productos.json')
const cartManager = new CartManager('carrito.json')

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('promo', () => {
    setTimeout( async () => {
      const product = await productManager.getRandom()
      socket.emit('promo', { title: product.title, sale: 15 })
    }, 700)
  })


  setTimeout(() => {
    socket.emit('promo', { title: 'GTA VI', sale: 10 })
  }, 700)


  socket.on('msg', (msg) => {
    socket.broadcast.emit('msg', msg)
  })

  socket.on('addToCart', async ({ userId, productId }) => {
    await cartManager.addProduct(userId, productId)
    const products = await cartManager.getProductsByUserId(userId)

    socket.emit('productsInCart', products)
  })
  // socket.join('room1')
  // socket.to('room1').emit('msg')
}

module.exports = socketManager