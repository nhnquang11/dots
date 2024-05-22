const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const config = require('../utils/config')
const { generateRandomPassword } = require('../utils/index')

const login = async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid email or password.'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config.SECRET)

  user.lastLogin = new Date()
  await user.save()
  response
    .status(200)
    .send({ token, isAdmin: user.isAdmin, username: user.username, name: user.name, email: user.email, profilePic: user.profilePic, id: user._id.toString() })
}

const google = async (request, response) => {
  const { email, name, profilePic } = request.body
  let user = await User.findOne({ email })

  if (!user) {
    password = generateRandomPassword(10)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    user = new User({
      username: email.split('@')[0],
      email,
      name,
      profilePic,
      passwordHash
    })
    user = await user.save()
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config.SECRET)

  response
    .status(200)
    .send({ token, isAdmin: user.isAdmin, username: user.username, name: user.name, email: user.email, profilePic: user.profilePic, id: user._id.toString() })
}

module.exports = { login, google }