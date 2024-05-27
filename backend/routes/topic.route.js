const { createTopic, getTopics, deleteTopic, getTopic, updateTopic } = require('../controllers/topic.controller')
const { userExtractor } = require('../utils/middleware')
const express = require('express')
const topicRouter = express.Router()

topicRouter.post('/', userExtractor, createTopic)
topicRouter.get('/', getTopics)
topicRouter.get('/:id', getTopic)
topicRouter.delete('/:id', userExtractor, deleteTopic)
topicRouter.put('/:id', userExtractor, updateTopic)

module.exports = topicRouter