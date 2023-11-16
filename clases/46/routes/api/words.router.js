const { Router } = require('express')

const router = Router()

// '%C3%A1' = a
// '%C3%A9' = e
// '%C3%AD' = i
// '%C3%B3' = o
// '%C3%BA' = u
// '%C3%BC' = u

// /api/dictionary/:word
// /api/dictionary/perro123@@*^%AHABNSKJjnjncksas123

// const aConAcento = 'á'.toString('utf8')
// locales

// router.param()
// if
router.get('/:word([a-zA-Z]+)', (req, res) => {
    res.send(req.params.word)
})


// else
router.get('*', (req, res) => {
    res.status(404).send({
        success: false,
        error: 'Not found'
    })
})


module.exports = router