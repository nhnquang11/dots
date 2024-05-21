const Comment = require('../models/comment.model')

const createComment = async (request, response) => {
  const comment = new Comment({
    authorId: request.user.id,
    storyId: request.body.storyId,
    content: request.body.content
  })

  const newComment = await comment.save()

  await newComment.populate('authorId')

  response.status(201).json(newComment);
}

const getComments = async (request, response) => {
  const comments = await Comment.find({}).populate('authorId')
  response.status(200).json(comments)
}

const getComment = async (request, response) => {
  const comment = await Comment.findById(request.params.id).populate('authorId')
  response.status(200).json(comment)
}

const updateComment = async (request, response) => {
  const updatedComment = await Comment.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(updatedComment)
}

const deleteComment = async (request, response) => {
  await Comment.findByIdAndDelete(request.params.id)
  response.status(204).end()
}

module.exports = {
  createComment, getComments, getComment, updateComment, deleteComment
}
