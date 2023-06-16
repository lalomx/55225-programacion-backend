const getRandom = () => Math.floor((Math.random() * 8) + 1); // un numero random entre 0 y 100

function processOrder(orderId) {
  return new Promise((resolve, reject) => {
    const tiempo = getRandom() * 1000
    setTimeout(() => {
      const isOrderValid = orderId % 2 === 0;
      if (isOrderValid) {
        resolve(true)
      } else {
        reject('la operacion es invalida')
      }
    }, tiempo)
  })
}



async function main() {
  const orders = [1, 5, 4, 8, 9, 10]
  for (const order of orders) {
    try {
      console.log(`procesando la order ${order}`)
      const resultado = await processOrder(order)
      console.log(resultado)
    } catch {
      console.log(`la orden ${order} es invalida`)
    }
  }
}

async function mainAll() {
  const orders = [2, 6, 4, 8, 12, 10]
  const promiseOrders = []
  for (const order of orders) {
    const prom = processOrder(order)
    promiseOrders.push(prom)
  }

  
  try {
    console.log(promiseOrders)
    // si una falla, todas fallan
    const resultadoDePromesas = await Promise.all(promiseOrders)
    console.log(resultadoDePromesas)
  } catch(e) {
    console.log(e)
    console.log(`aqui fallo`)
  }
}

mainAll()


