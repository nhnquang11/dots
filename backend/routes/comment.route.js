const { createComment, getComments, getComment, updateComment, deleteComment } = require('../controllers/comment.controller')
const { userExtractor } = require('../utils/middleware')
const express = require('express')
const commentRouter = express.Router()

commentRouter.post('/', userExtractor, createComment)
commentRouter.get('/', getComments)
commentRouter.get('/:id', getComment)
commentRouter.put('/:id', userExtractor, updateComment)
commentRouter.delete('/:id', userExtractor, deleteComment)

module.exports = commentRouter
