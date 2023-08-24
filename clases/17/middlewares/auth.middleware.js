function isAuth(req, res, next) {
<<<<<<< HEAD
    if (!req.user) {
        res.redirect('/')
        return
    }

    next()
}

module.exports = {
    isAuth
}
=======
  if (req.user) {
    next()
    return
  }

  res.redirect('/login')
}

module.exports = isAuth
>>>>>>> main
