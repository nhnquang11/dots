const { createStory, getStories, getStory, updateStory, deleteStory, addCommentToStory } = require('../controllers/story.controller')
const express = require('express')
const { userExtractor } = require('../utils/middleware')
const storyRouter = express.Router()

storyRouter.post('/', userExtractor, createStory)
storyRouter.get('/', getStories)
storyRouter.get('/:id', getStory)
storyRouter.put('/:id', userExtractor, updateStory)
storyRouter.put('/:id/comment', userExtractor, addCommentToStory)
storyRouter.delete('/:id', deleteStory)

module.exports = storyRouter