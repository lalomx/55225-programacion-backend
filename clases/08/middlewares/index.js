module.exports = {
  aumentaContador: (req, res, next) => {
    req.contador = (req.contador || 0) + 1
  
    next()
  }
}