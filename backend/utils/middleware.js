const jwt = require('jsonwebtoken')
const config = require('./config')
const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token.' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    console.log('Token extracted:', request.token)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing.' })
  }
  request.user = decodedToken
  next()
}

module.exports = {
  unknownEndpoint, requestLogger, errorHandler, tokenExtractor, userExtractor
}