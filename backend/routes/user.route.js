const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/user.controller')
const { userExtractor } = require('../utils/middleware')
const express = require('express');
const userRouter = express.Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', createUser)
userRouter.delete('/:id', userExtractor, deleteUser)
userRouter.put('/:id', userExtractor, updateUser)

module.exports = userRouter