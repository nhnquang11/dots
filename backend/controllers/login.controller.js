const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const config = require('../utils/config')

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

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
}

module.exports = { login }