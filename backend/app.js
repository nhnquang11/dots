const express = require('express')
require('express-async-errors');
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const userRouter = require('./routes/user.route')
const topicRouter = require('./routes/topic.route')
const commentRouter = require('./routes/comment.route')
const storyRouter = require('./routes/story.route')
const loginRouter = require('./routes/login.route')

mongoose.connect(config.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
})

const app = express()
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/topics', topicRouter)
app.use('/api/comments', commentRouter)
app.use('/api/stories', storyRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app