const base = 5
const exp = 2

// 2 ^ 7 = 128

let resultado = base ** exp

// console.log(resultado)

// array includes

const user = {
  name: 'X',
  role: 'admin'
}

const rolesPermitidos = ['admin', 'privilegiado', 'otro']
const existe = rolesPermitidos.includes(user.role)

// console.log(existe)

const nums = [5, 8, 10, 46, 25]

console.log(nums.includes(-5))

