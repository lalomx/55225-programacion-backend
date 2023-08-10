function isAuth(req, res, next) {
    if (!req.user) {
        res.redirect('/')
        return
    }

    next()
}

module.exports = {
    isAuth
}