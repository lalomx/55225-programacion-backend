const getUsers = (req, res) => res.send('getUsers')
const getUserById = (req, res) => res.send('getUserById')
const createUser = (req, res) => res.send('createUser')

module.exports = {
  getUserById,
  getUsers,
  createUser
}