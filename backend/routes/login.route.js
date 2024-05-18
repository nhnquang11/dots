const { login } = require('../controllers/login.controller')
const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/', login)

module.exports = loginRouter