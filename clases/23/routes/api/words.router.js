const { Router } = require('express')

const router = Router()

const words = {
    dog: "A 4-leged animal",
    bird: "A 2-ledged animal",
    pc: "Technology"
}

// '%C3%A1' = a
// '%C3%A9' = e
// '%C3%AD' = i
// '%C3%B3' = o
// '%C3%BA' = u
// '%C3%BC' = u

router.get('/:word([a-zA-Z]+)', (req, res) => {
    const { word } =  req.params

    console.log(word)

    res.send(word)
})

// router.get()

router.get('*', (req, res) => res.sendStatus(404))
module.exports = router