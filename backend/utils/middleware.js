const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  unknownEndpoint, requestLogger
}