const nombre = `           Giancarlo     `

// console.log(nombre.trim().length)

// depth 1
const arr = [1, 2, 3, [4, 5, 10, [15, [1, 2]]], [7, 8, 9], 10]

console.log(arr.flat().flat().flat().flat())
