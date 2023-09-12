process.on('exit', (code) => {
  if (code === -4) {
    console.log('Invalid arguments')
  }
})

function listNumbers(args) {
  const types = []

  for (const n of args) {
    const parsed = parseInt(n) // NaN
    types.push(Number.isNaN(parsed) ? typeof n : 'number')
  }

  return types
}

const args = process.argv.slice(2)

const types = listNumbers(args)

if (types.some(t => t !== 'number')) {
  process.exit(-4)
}