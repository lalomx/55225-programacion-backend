function main() {
  setTimeout(() => {
    console.log('ejecucion despues de 3 segundos')
  }, 3000)
}

function iniciaContador() {
  let contador = 5;
  const timer = setInterval(() => {
    const fecha = new Date()
    console.log(fecha.toISOString())

    if (contador === 0){
      clearInterval(timer)
    }
    contador--
  }, 1000)
}

// main()
iniciaContador()

