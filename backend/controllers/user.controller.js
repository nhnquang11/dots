
const User = require('../models/user.model')

const createUser = (request, response) => {
  if (!request.body.name) {
    request.body.name = request.body.username
  }

  if  (!request.body.isAdmin) {
    request.body.isAdmin = false
  }
  
  const user = new User({
    username: request.body.username,
    name: request.body.name,
    email: request.body.email,
    passwordHash: request.body.passwordHash,
    registrationDate: new Date(),
    lastLogin: new Date(),
    isAdmin: request.body.isAdmin
  })

  user.save().then(savedUser => {
    response.json(savedUser)
  }).catch(error => {
    console.log('Error saving user:', error.name)
    response.json(error)
  })
}

const getUsers = (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
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
  deleteUser, 
  updateUser
}