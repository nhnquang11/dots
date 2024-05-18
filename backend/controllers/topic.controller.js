const Topic = require('../models/topic.model')

// Post new topic
const createTopic = async (request, response) => {
  const topic = new Topic({
    name: request.body.name,
    stories: []
  })
  const savedTopic = await topic.save()
  response.status(201).json(savedTopic)
}

// Find all
const getTopics = async (request, response) => {
  const topics = await Topic.find({})
  response.status(200).json(topics)
}

// Find by Id
const getTopic = async (request, response) => {
  const topic = await Topic.findById(request.params.id)
  response.status(200).json(topic)
}

// Delete by Id
const deleteTopic = async (request, response) => {
  await Topic.findByIdAndDelete(request.params.id)
  response.status(204).end()
}

// Update by Id
const updateTopic = async (request, response) => {
  const updatedTopic = await Topic.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(updatedTopic)
}

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  deleteTopic,
  updateTopic
}