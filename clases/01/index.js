function foo() {
  let i = 0
  if (true) {
    let i = 1
    // console.log(i)
  }

  // console.log(i)
}

// {
//   // scope
//   {
//     // scope
//     console.log('scope dentro de scope')
//   }
// }

// console.log(i)
// foo()

const nombre = 'lalo'
// nombre = 'luciano'

console.log(nombre)

// objetos
// arrays

const obj = { nombre: 'leandro', edad: 15 }

console.log(obj)

obj.edad = 25 // mutando mi objeto

console.log(obj)

// obj = {} // reasignacion

const arr = [0, 1, 2]

arr[1] = 5

console.log(arr)