const nombre = 'Ana'
const deuda = '1000'
const currency = 'USD'
const pagarAntesDe = 'Julio, 25. 2023'

const multiplicar = (deuda) => deuda * 2400
const mensaje = `Hola, ${`AHKJHAKJ${nombre}`}.

Te escribimos del banco de Elon Musk para que pagues lo que debes.
Tu deuda asciende a $${multiplicar(deuda)} ${currency}.

Favor de pagar antes de la fecha: ${pagarAntesDe}

-- Sinceramente

ChatGTP
`

console.log(mensaje)