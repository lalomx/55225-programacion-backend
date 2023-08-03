const stock = {
  rd2: 50, // entry
  got: 20, // entry
  loz: 100, // entry
  gow3: 65,
  god1: 25,
  lll: { num: 50 }
}

const arr = Object.entries(stock) // [ ['rd2', 50] ... ]

// key-value pair
// depth 1
// for (const kv of arr) {
//   console.log(`La propiedad ${kv[0]} tiene como valor ${kv[1].num}`)
// }

// arr.forEach((kv) => {
//   console.log(`La propiedad ${kv[0]} tiene como valor ${kv[1]}`)
// })


const values = Object.values(stock)

console.log(values.reduce((v, acc) => v + acc, 0))
// console.log(values)

const keys = Object.keys(stock)

// console.log(keys)
