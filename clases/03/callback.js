function main(callback) {
  // instrucciones
  console.log('ejecutando la funcion main')

  ///
  callback(null, 'hello world')

  //
  console.log('finalizando la funcion main')
}

function callback1(error, string) {
  console.log(string)
}

const callback2 = (error, string) => console.log(string)


main((error, string) => {
  console.log('funcion anonima como parametro')
  console.log(string)
})

// un callback es funcion que se envia como parametro a otra funcion