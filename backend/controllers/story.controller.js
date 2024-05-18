const Story = require('../models/story.model')

const createStory = (request, response) => {
  const story = new Story({
    authorId: request.body.authorId,
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    imageUrl: request.body.imageUrl,
    likes: 0,
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    topics: [],
    comments: []
  })

  story.save().then(savedStory => {
    response.json(savedStory)
  }).catch(error => {
    console.log('Error saving story:', error.name)
    response.json(error)
  })
}

const getStories = (request, response) => {
  Story.find({}).then(stories => {
    response.json(stories)
  }).catch(error => {
    console.log('Error getting stories:', error.name)
    response.json(error)
  })
}

const getStory = (request, response) => {
  Story.findById(request.params.id).then(story => {
    response.json(story)
  }).catch(error => {
    console.log('Error getting story:', error.name)
    response.json(error)
  })
}

const updateStory = (request, response) => {
  Story.findByIdAndUpdate(request.params.id, request
    .body, { new: true }).then(updatedStory => {
    response.json(updatedStory)
  }).catch(error => {
    console.log('Error updating story:', error.name)
    response.json(error)
  })
}

const deleteStory = (request, response) => {
  Story.findByIdAndDelete(request.params.id).then(deletedStory => {
    response.json(deletedStory)
  }).catch(error => {
    console.log('Error deleting story:', error.name)
    response.json(error)
  })
}

module.exports = {
  createStory, getStories, getStory, updateStory, deleteStory
}

