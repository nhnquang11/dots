const { login, google } = require('../controllers/login.controller')
const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/', login)
loginRouter.post('/google', google)

module.exports = loginRouter