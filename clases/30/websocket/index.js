const productManager = require('../managers/product.manager.js')
const chatMessageManager = require('../managers/chat.message.manager.js')
// const CartManager = require('../managers/cart.manager.js')
// const cartManager = new CartManager('carrito.json')

async function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  /// logica de mensajes
  // obtener todos los mensajes de la base de datos
  const messages = await chatMessageManager.getAll()
  // console.log(messages)
  socket.emit('chat-messages', messages)

  socket.on('chat-message', async (msg) => {
    // guardar el mensaje en la DB
    console.log(msg)
    await chatMessageManager.create(msg)
    socket.broadcast.emit('chat-message', msg)
  })

  // socket.on('user', ({ user, action }) => {
  //   userOnline[socket.id] = user
  //   socket.broadcast.emit('user', { user, action })
  // interactuar con el modelo de usuario
  // })

  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('user', {
  //     user: userOnline[socket.id],
  //     action: false
  // interactuar con el modelo de usuario
  //   })

  //   delete userOnline[socket.id] // como borrar la propiedad del objeto
  // })

  // socket.on('promo', () => {
  //   setTimeout( async () => {
  //     const product = await productManager.getRandom()
  //     socket.emit('promo', { title: product.title, sale: 15 })
  //   }, 700)
  // })


  // setTimeout(() => {
  //   socket.emit('promo', { title: 'GTA VI', sale: 10 })
  // }, 700)

  // socket.on('addToCart', async ({ userId, productId }) => {
  //   await cartManager.addProduct(userId, productId)
  //   const products = await cartManager.getProductsByUserId(userId)
  // interactuar con el modelo de carrito

  //   socket.emit('productsInCart', products)
  // })
  // socket.join('room1')
  // socket.to('room1').emit('msg')
}

module.exports = socketManager