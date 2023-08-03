const getRandom = () => Math.floor((Math.random() * 8) + 1); // un numero random entre 0 y 100

function processOrder(orderId, callback) {
  // simulando una operacion asincrona
  // con set timeout
  // se ejecuta despues de 3000 ms o 3 segundos
  const tiempo = getRandom() * 1000
  // console.log(`la orden ${orderId} se procesara en ${tiempo} milisegundos`)
  setTimeout(() => {
    const isOrderValid = orderId % 2 === 0;

    if (isOrderValid) {
      // console.log('la orden es valida')
      // operacion valida
      callback(null, true)
    } else {
      // console.log('la orden es invalida')
      // invalida
      callback('la operacion es invalida', false)
    }
  }, tiempo)
}

const orders = [1, 5, 4, 8, 9, 10]

for (const order of orders) {
  console.log(`procesando la order ${order}`)
  processOrder(order, (error, resultado) => {
    if (error) {
      console.log(`la order ${order} es invalida`)
    } else {
      console.log(`la orden ${order} es valida`)
    }
  })
}


