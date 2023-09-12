const { Router } = require('express')
const cartManager = require('../../managers/cart.manager')
const productManager = require('../../managers/product.manager')
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
            } catch(e) {
                res.status(500).send({
                    error: e.stack
                })
            }
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

            } catch(e) {
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
            } catch(e) {
                res.sendError(e)
            }
        })
    }
}

module.exports = {
    custom: new CartRouter()
}

