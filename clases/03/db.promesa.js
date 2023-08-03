function fetchData () {
  return new Promise((resolve, reject) => {
    const nombres = ['John', 'Jane', 'Bob', 'Alice']
    setTimeout(() => {
      // 2 seconds
      resolve(nombres)
      // reject('error')
    }, 2000) // timer que ejecuta el primer parametro despues X ms (segundo parametro)
  })
}


async function main() {
  console.log('obteniendo data...')
  try {
    const data = await fetchData()
    const data2 = await fetchData()
    return [ ...data, ...data2 ]
  } catch(e) {
    console.log(e)
    console.log('hubo algun error')
    return []
    /// 
  } finally {
    console.log('finally')
  }
}

main().then((data) => console.log(data))

// Promise.all()
// Promise.allSettled 

