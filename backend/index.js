require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const MONGO_URI = process.env.MONGO_URI

let topics = []
let users = []
let stories = []
let comments = []

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
})

const app = express()
app.use(express.json())
morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/topics', (request, response) => {
  response.json(topics)
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

app.get('/api/stories', (request, response) => {
  response.json(stories)
})

app.get('/api/comments', (request, response) => {
  response.json(comments)
})

app.post('/api/topics', (request, response) => {
  const topic = request.body
  topics = topics.concat({topic, id: topics.length + 1})
  response.json(topic)
})

app.post('/api/users', (request, response) => {
  const user = request.body
  users = users.concat({user, id: users.length + 1})
  console.log('users', users)
  response.json(user)
})

app.post('/api/stories', (request, response) => {
  const story = request.body
  stories = stories.concat({...story, id: stories.length + 1})
  console.log('stories', stories)
  response.json(story)
})

app.post('/api/comments', (request, response) => {
  const comment = request.body
  comments = comments.concat({...comment, id: comments.length + 1})
  console.log('comments', comments)
  response.json(comment)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})