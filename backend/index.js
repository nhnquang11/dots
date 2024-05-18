const express = require('express')
const app = express()

let topics = []
let users = []
let stories = []
let comments = []

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/topics', (request, response) => {
  response.json(topics)
})

app.post('/api/topics', (request, response) => {
  const topic = request.body
  topics = topics.concat(topic)
  console.log('topics', topics)
  response.json(topic)
})

app.post('/api/users', (request, response) => {
  const user = request.body
  users = users.concat(user)
  console.log('users', users)
  response.json(user)
})

app.post('/api/stories', (request, response) => {
  const story = request.body
  stories = stories.concat(story)
  console.log('stories', stories)
  response.json(story)
})

app.post('/api/comments', (request, response) => {
  const comment = request.body
  comments = comments.concat(comment)
  console.log('comments', comments)
  response.json(comment)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})