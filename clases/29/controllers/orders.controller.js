const get = (req, res) => res.send('get')
const getById = (req, res) => res.send('getById')
const create = (req, res) => res.send('create')
const resolve = (req, res) => res.send('resolve')

module.exports = {
  getById,
  get,
  create,
  resolve
}