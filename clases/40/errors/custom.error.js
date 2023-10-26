// ENUM
const ErrorType = {
  DB: 'Error en la base de datos',
  General: 'Error general en la aplicacion',
  Otro: 'Otro codigo de error'
}

class CustomError extends Error {
  constructor(message, type) {
    super(message)

    this.type = type
  }
}

module.exports = {
  CustomError,
  ErrorType
}