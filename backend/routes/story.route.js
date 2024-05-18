const { createStory, getStories, getStory, updateStory, deleteStory } = require('../controllers/story.controller')
const express = require('express')
const storyRouter = express.Router()

storyRouter.post('/', createStory)
storyRouter.get('/', getStories)
storyRouter.get('/:id', getStory)
storyRouter.put('/:id', updateStory)
storyRouter.delete('/:id', deleteStory)

module.exports = storyRouter