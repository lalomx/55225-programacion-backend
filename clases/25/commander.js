const { Command } = require('commander')
// console.log('init')

const program = new Command()

program
  .option('-d', 'debug flag', false)
  .option('-p', 'Puerto de escucha', 8080)
  .option('--mode', 'modo de ejecuciion', 'development')
  .requiredOption('-u', 'Usuario del proceso', 'sin usuario')

program.parse()

console.log('Options', program.opts())
console.log('Remaining arguments', program.args)