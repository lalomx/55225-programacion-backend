const { Router } = require('express')
const cartManager = require('../../managers/cart.manager')
const productManager = require('../../managers/product.manager')
const purchaseOrderManager = require('../../managers/purchase.manager')
const CustomRouter = require('./custom.router')

class CartRouter extends CustomRouter {

  init() {
    // se ejecuta solamente si alguna ruta de abajo contiene el param :cartId
    this.router.param('cartId', async (req, res, next, cartId) => {
      try {
        const cart = await cartManager.getById(cartId)

        if (!cart) {
          return res.status(404).send({
            success: false,
            error: "Cart not found"
          })
        }

        req.cart = cart

        next()
      } catch (e) {
        res.status(500).send({
          success: false,
          error: e.stack
        })
      }
    })

    this.get('/', ["ADMIN"], async (req, res) => {
      try {
        const carts = await cartManager.getAll()

        res.send(carts)
      } catch (e) {
        res.status(500).send({
          error: e.stack
        })
      }
    })

    this.get('/:cartId/purchase', ["PUBLIC"], async (req, res) => {
      const { cartId } = req.params

      /// TODO
      // ejecutar un metodo en el repository o service para crear la orden de compra
      // envio al cliente un 201 HTTP ACCEPTED o 400 o 500
      // cartManager.getById()
      // purchaseOrderManager.create()

      const cart = await cartManager.getById(cartId)

      if (!cart) {
        return res.sendStatus(404)
      }

      const { products: productsInCart } = cart
      const products = [] // dto
      // {
        // price,
        // id
        // qty
      // }
      // const productsToDelete = []
      
      for (const { product: id, qty } of productsInCart) {
        // chequear el stock
        // 1. si el qty <= stock entonces agrego el producto al array y lo elimino del carro
        // 2. actualizo el stock


        const p = await productManager.getById(id)

        // stock: 5, qty: 1 => 1 y -1
        // stock: 5, qty: 5 => 5 y -5
        // stock: 5, qty: 6, 6 y -5
        // stock: 0, qty: 1, 0 y 0

        if (!p.stock) {
          return
        }

        const toBuy = p.stock >= qty ? qty : p.stock

        products.push({
          id: p._id,
          price: p.price,
          qty: toBuy
        })

        //
        
        /// actualizar el stock
        p.stock = p.stock - toBuy

        await p.save()

        // actualizo el carrito
        // TODO
      }


      const po = {
        user: null, // agarrar el user de la sesion
        code: null, // generarlo automaticamente
        total: products.reduce((total, { price, qty}) => (price * qty) + total, 0), // calcular el total de los productos
        products: products.map(({ id, qty}) =>  {
          return {
            product: id,
            qty
          }
        })
      }

      console.log(po)

      // guardar el ticket/po/order en la db
      // enviar un sms o un email

      res.send(po)

      // express -> router -> controller -> service -> repository -> model
    })

    this.get('/:cartId/products', ["CUSTOMER", "ADMIN"], async (req, res) => {
      const { cart } = req
      try {
        console.log(cart)

        res.sendSuccess(cart.products)
      } catch (e) {
        res.sendError(e)
      }
    })

    this.put('/:cartId/products/:productId', ["CUSTOMER", "ADMIN"], async (req, res) => {
      const { cartId, productId } = req.params
      try {
        if (!await productManager.getById(productId)) {
          return res.sendStatus(404)
        }

        const cart = await cartManager.getById(cartId)

        if (!cart) {
          return res.sendStatus(404)
        }

        await cartManager.addProductToCart(cartId, productId)

        res.send({
          success: true
        })

      } catch (e) {
        res.sendError(e)
      }
    })

    this.delete('/:cartId/products/:productId', ["CUSTOMER", "ADMIN"], async (req, res) => {
      const { cartId, productId } = req.params
      try {
        if (!await productManager.getById(productId)) {
          return res.sendStatus(404)
        }

        const cart = await cartManager.getById(cartId)

        if (!cart) {
          return res.sendStatus(404)
        }

        await cartManager.deleteProductFromCart(cartId, productId)

        res.sendSuccess('OK')
      } catch (e) {
        res.sendError(e)
      }
    })
  }
}

module.exports = {
  custom: new CartRouter()
}

