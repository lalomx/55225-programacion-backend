const div = (a, b) => {
  return new Promise((rej, res) => {
    if (divisior == 0) {
      rej('no se puede dividir entre 0')
      return
    }

    res(a/b)
  })
}

const res = div(1, 2)

console.log(res)


// usar then y catch

// imprimir el estado
// usar set timeout para checar el estado pending
// ejemplo de la base de datos en promesa