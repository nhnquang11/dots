const { createUser, getUser, deleteUser } = require('../controllers/user.controller')
const express = require('express');
const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter