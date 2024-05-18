const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/user.controller')
const express = require('express');
const userRouter = express.Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser)

module.exports = userRouter