const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

topicSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }}
)

const Topic = mongoose.model('Topic', topicSchema)

module.exports = Topic
