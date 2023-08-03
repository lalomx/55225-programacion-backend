function fetchData (table, columns, callback) {
  const nombres = ['John', 'Jane', 'Bob', 'Alice']
  setTimeout(() => {
    // 2 seconds
    callback('error', nombres)
  }, 5000) // timer que ejecuta el primer parametro despues X ms (segundo parametro)
}


fetchData('users', ['nombre'], (error, data) => {
  if (error) {
    console.log('hay un error', error)
  } else {
    console.log(data)
  }
})

console.log('obteniendo data...')
