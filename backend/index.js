require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const User = require('./models/user.model')

mongoose.connect(config.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
})

const app = express()
app.use(express.json())
app.use(middleware.requestLogger)

app.post('/api/users', (request, response) => {
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
})

app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

app.use(middleware.unknownEndpoint)
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
