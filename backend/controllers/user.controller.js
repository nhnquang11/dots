
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const {validatePassword} = require('../utils/validate')

const createUser = async (request, response, next) => {
  let { username, name, email, password } = request.body

  if (!name) {
    name = username
  }

  if (!password) {
    return response.status(400).json({ error: 'Password is required.' })
  }
  const passwordCheckResult = validatePassword(password)
  if (!passwordCheckResult.valid) {
    return response.status(400).json({ error: passwordCheckResult.message })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    email,
    passwordHash
  })

  const newUser = await user.save()
  response.status(201).json(newUser)
}

const getUsers = async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
}

const getUser = async (request, response) => {
  const user = await User.findById(request.params.id)
  response.status(200).json(user)
}

const deleteUser = (request, response) => {
  User.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
}

const updateUser = (request, response) => {
  const user = {
    username: request.body.username,
    name: request.body.name,
    email: request.body.email,
    passwordHash: request.body.passwordHash,
    registrationDate: new Date(),
    lastLogin: new Date(),
    isAdmin: request.body.isAdmin
  }

  User.findByIdAndUpdate(request.params.id, user, { new: true }).then(result => {
    response.json(result)
  })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser, 
  updateUser
}