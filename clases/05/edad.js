const moment = require('moment')

function daysFromBirth(date) {
  const birth = moment(date, "YYYY-MM-DD")
  const now = moment()

  // console.log(now, birth)

  return now.diff(birth, 'day')
}


console.log(`Dias desde tu nacimiento: ${daysFromBirth('1992-08-06')}`)