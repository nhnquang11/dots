const { createUser, getUser } = require('../controllers/user.controller')
const express = require('express');
const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.post('/', createUser)

module.exports = userRouter