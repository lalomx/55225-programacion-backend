let modo = 'suma'

async function example() {
  if (modo === 'suma') {
    const { suma } = await import('./suma.js')
    const resultado = suma(2,2)
    console.log(resultado)
  }
}

// example()

const nombre = `     lalo`

console.log(nombre.trim())

const arr = [1, 2, 3,  [4, 5, 6], [7, 8, 9], 10]

console.log(arr.flat())