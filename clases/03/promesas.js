// const div = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // console.log('se resuelve')
//     // resolve('hello world')
//     resolve(2)
//   }, 2000)
// })

// // console.log(div)

// // setTimeout(() => {
// //   console.log(div)
// // }, 4000)

// div.then((data) => {
//   console.log('paso X tiempo')
//   console.log(data)
// }).catch((err) => {
//   console.log(err)
// }).finally(() => {
//   console.log(' al final ')
// })



const mult = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('se resuelve')
    // resolve('hello world')
    resolve(2)
  }, 2000)
})

console.log('operacion 1')
console.log('operacion 2')
console.log('operacion 2')

// 0 1 1 2 3 5 8
let resultadoFinal = 0
mult.then((num) => {
  const res = num * 2

  return res
}).then((num) => {
  console.log('el numero final')
  console.log(num)

  resultadoFinal = num
})

console.log(resultadoFinal)

