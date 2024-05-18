const Topic = require('../models/topic.model')

const createTopic = (request, response) => {
  const topic = new Topic({
    name: request.body.name,
    stories: []
  })

  topic.save().then(savedTopic => {
    response.json(savedTopic)
  }).catch(error => {
    console.log('Error saving topic:', error.name)
    response.json(error)
  })
}

const getTopics = (request, response) => {
  Topic.find({}).then(topics => {
    response.json(topics)
  }).catch(error => {
    console.log('Error getting topics:', error.name)
    response.json(error)
  })
}

const getTopic = (request, response) => {
  Topic.findById(request.params.id).then(topic => {
    response.json(topic)
  }).catch(error => {
    console.log('Error getting topic:', error.name)
    response.json(error)
  })
}

const deleteTopic = (request, response) => {
  Topic.findByIdAndDelete(request.params.id).then(deletedTopic => {
    response.json(deletedTopic)
  }).catch(error => {
    console.log('Error deleting topic:', error.name)
    response.json(error)
  })
}

const updateTopic = (request, response) => {
  Topic.findByIdAndUpdate(request.params.id, request.body, { new: true }).then(updatedTopic => {
    response.json(updatedTopic)
  }
  ).catch(error => {
    console.log('Error updating topic:', error.name)
    response.json(error)
  })
}

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  deleteTopic,
  updateTopic
}