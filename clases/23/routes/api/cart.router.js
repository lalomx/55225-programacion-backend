const { Router } = require('express')
const cartManager = require('../../managers/cart.manager')
const productManager = require('../../managers/product.manager')
const CustomRouter = require('./custom.router')

const router = Router()

router.param('cartId', async (req, res, next, cartId) => {
    try {
        const cart = await cartManager.getById(cartId)

        if (!cart) {
            console.log('not found!')
            return res.sendStatus(404)
        }

        // add req.cart

        next()
    } catch (e) {
        console.log('mee')
        res.status(500).send({
            error: e.stack
        })
    }
})

router.get('/:cartId/products', async (req, res) => {
    const { cartId } = req.params
    try {
        const cart = await cartManager.getById(cartId)

        if (!cart) {
            return res.sendStatus(404)
        }

        // console.log(cart)

        res.send(cart.products)
    } catch (e) {
        res.status(500).send({
            error: e.stack
        })
    }
})

router.put('/:cartId/products/:productId', async (req, res) => {
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
        res.status(500).send({
            error: e.stack
        })
    }
})

router.delete('/:cartId/products/:productId', async (req, res) => {
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

        res.send({
            success: true
        })
    } catch(e) {
        res.status(500).send({
            error: e.stack
        })
    }
})


class CartRouter extends CustomRouter {
    init() {
        this.get('/', (req, res) => {
            res.send('OK')
        })
    }
}

module.exports = {
    router,
    custom: new CartRouter()
}