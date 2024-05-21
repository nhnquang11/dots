const mongoose = require('mongoose')

const analyticSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0
  },
})

analyticSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }}
)

const Analytic = mongoose.model('Analytic', analyticSchema)

module.exports = Analytic
