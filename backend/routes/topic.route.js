const { createTopic, getTopics, deleteTopic, getTopic, updateTopic } = require('../controllers/topic.controller')
const express = require('express')
const topicRouter = express.Router()

topicRouter.post('/', createTopic)
topicRouter.get('/', getTopics)
topicRouter.get('/:id', getTopic)
topicRouter.delete('/:id', deleteTopic)
topicRouter.put('/:id', updateTopic)

module.exports = topicRouter