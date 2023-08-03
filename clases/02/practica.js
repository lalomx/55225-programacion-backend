const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

const tipoDeProductos = []
let sum = 0

for (const obj of objetos) {
  const keys = Object.keys(obj)

  for (const k of keys) {
    if (!tipoDeProductos.includes(k)) {
      tipoDeProductos.push(k)
    }
  }

  // sumatoria de productos vendidos

  const values = Object.values(obj) // [3, 2, 1, 5, 2]

  sum += values.reduce((v, acc) => v + acc, 0)
}

console.log(tipoDeProductos)
console.log(`La suma es ${sum}`)