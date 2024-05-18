const Comment = require('../models/comment.model')

const createComment = (request, response) => {
  const comment = new Comment({
    authorId: request.body.authorId,
    storyId: request.body.storyId,
    content: request.body.content,
    createdAt: new Date(),
    likes: 0
  })

  comment.save().then(savedComment => {
    response.json(savedComment)
  }).catch(error => {
    console.log('Error saving comment:', error.name)
    response.json(error)
  })
}

const getComments = (request, response) => {
  Comment.find({}).then(comments => {
    response.json(comments)
  }).catch(error => {
    console.log('Error getting comments:', error.name)
    response.json(error)
  })
}

const getComment = (request, response) => {
  Comment.findById(request.params.id).then(comment => {
    response.json(comment)
  }).catch(error => {
    console.log('Error getting comment:', error.name)
    response.json(error)
  })
}

const updateComment = (request, response) => {
  Comment.findByIdAndUpdate(request.params.id, request
    .body, { new: true }).then(updatedComment => {
    response.json(updatedComment)
  }).catch(error => {
    console.log('Error updating comment:', error.name)
    response.json(error)
  })
}

const deleteComment = (request, response) => {
  Comment.findByIdAndDelete(request.params.id).then(deletedComment => {
    response.json(deletedComment)
  }).catch(error => {
    console.log('Error deleting comment:', error.name)
    response.json(error)
  })
}

module.exports = {
  createComment, getComments, getComment, updateComment, deleteComment
}
