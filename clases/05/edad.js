// const moment = require('moment') // commonjs
import moment from "moment" // esmodule


// YYYY-MM-DD
function diffInDays(input) {
  const now = moment()
  const date = moment(input, 'YYYY-MM-DD')

  // date.format('YYYY-MM-DD')

  return now.diff(date, 'day')
}

console.log(`Han pasado ${diffInDays('1992-08-06')} años desde tu nacimiento`)

module.exports = {} // commonjs

export {} // esmodule