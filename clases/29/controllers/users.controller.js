const { userRepository: repository } = require('../repositories')

const get = async (req, res) => {
  try {
    const payload = await repository.getAll().lean()

    res.send({ success: true, payload })
  } catch (e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso una lista de objetos/vacia

const getById = async (req, res) => {
  const { id } = req.params
  try {
    const payload = await repository.getById(id).lean()

    res.send({ success: true, payload })
  } catch (e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso un obj
const create = async (req, res) => {
  const body = req.body
  try {
    const payload = await repository.create(body)
    res.send({ success: true, payload })
  } catch(e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso un obj recien creado

module.exports = {
  get,
  getById,
  create
}