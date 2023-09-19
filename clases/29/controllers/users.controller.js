const get = (req, res) => res.send('get')
const getById = (req, res) => res.send('getById')
const create = (req, res) => res.send('create')

module.exports = {
  getById,
  get,
  create
}