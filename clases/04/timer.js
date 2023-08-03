function main() {
  const id = setTimeout(() => {
    console.log('ejecucion despues de 3 s')
  }, 3 * 1000)
  
  clearTimeout(id)
}

function contador() {
  let contador = 5
  const id = setInterval(() => {
    console.log('ejecucion de set interval despues de 1 s')

    if (contador === 0) {
      clearInterval(id)
      return
    }

    contador--
    // closure
  }, 1 * 1000)
}



contador()