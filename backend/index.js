const express = require('express')
const app = express()

let topics = []

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/topics', (request, response) => {
  response.json(topics)
})

app.post('/api/topics', (request, response) => {
  console.log(request.body)
  const topic = request.body
  topics = topics.concat(topic)
  console.log(topic)
  console.log(topics)
  response.json(topic)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})