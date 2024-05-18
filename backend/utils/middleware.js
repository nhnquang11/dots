const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    const [key, value] = Object.entries(error.keyValue)[0]
    return response.status(400).json({ error: `${key} ${value} already exists.` })
  }
  next(error)
}

module.exports = {
  unknownEndpoint, requestLogger, errorHandler
}