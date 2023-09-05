const args = process.argv.slice(2)

const types = []

for (const input of args) {
  const parsed = parseInt(input)
  types.push(Number.isNaN(parsed) ? typeof input : typeof parsed)
}

if (types.some(i => i !== "number")) {
  console.log('invalid parameters')
}

console.log(types)