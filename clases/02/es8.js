const stock = {
  rd2: 10,
  got: 50,
  loz: 100
}

const llaveValor = Object.entries(stock)
const props = Object.keys(stock)
const values = Object.values(stock)

const totalItems = values.reduce((v, acc) => v + acc)