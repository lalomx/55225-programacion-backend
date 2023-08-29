const { Router } = require('express')
const cartManager = require('../../managers/cart.manager')
const productManager = require('../../managers/product.manager')

const router = Router()

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

module.exports = router