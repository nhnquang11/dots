// const { test, after, describe, beforeEach } = require('node:test')
// const assert = require('node:assert');
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const api = supertest(app)
// const Story = require('../models/story.model')
// const User = require('../models/user.model')
// const Comment = require('../models/comment.model')

// describe('initially comments are empty, one user in db, one story in db', () => {
//   beforeEach(async () => {
//     await Comment.deleteMany({})
//     await User.deleteMany({})
//     await Story.deleteMany({})

//     const user = await new User(
//       {
//         username: "username",
//         email: "user@example.com",
//         passwordHash: "pass123"
//       }
//     ).save()

//     new Story({
//       authorId: user._id,
//       title: 'Story1',
//       description: 'Description1',
//       content: 'Content1',
//       imageUrl: 'Image1'
//     }).save()
//   })

//   test('comments are returned as json', async () => {
//     await api
//       .get('/api/comments')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })

//   test('check initally db is empty', async () => {
//     const response = await api.get('/api/comments')
//     assert.strictEqual(response.body.length, 0)
//   })

//   test('a comment can be added', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = {
//       authorId: users[0]._id,
//       storyId: stories[0]._id,
//       content: 'Comment1'
//     }
//     await api
//       .post('/api/comments')
//       .send(newComment)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const comments = await Comment.find({})
//     assert.strictEqual(comments.length, 1)
//     assert.strictEqual(comments[0].content, newComment.content)
//   })

//   test('a comment without content is not added', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = {
//       authorId: users[0]._id,
//       storyId: stories[0]._id
//     }
//     await api
//       .post('/api/comments')
//       .send(newComment)
//       .expect(400)
//   })

//   test('a comment can be deleted', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = await new Comment({
//       authorId: users[0]._id,
//       storyId: stories[0]._id,
//       content: 'Comment1'
//     }).save()

//     await api
//       .delete(`/api/comments/${newComment.id}`)
//       .expect(204)

//     const comments = await Comment.find({})
//     assert.strictEqual(comments.length, 0)
//   })

//   test('a comment can be updated', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = await new Comment({
//       authorId: users[0]._id,
//       storyId: stories[0]._id,
//       content: 'Comment1'
//     }).save()

//     const updatedComment = {
//       content: 'Comment2'
//     }

//     await api
//       .put(`/api/comments/${newComment.id}`)
//       .send(updatedComment)
//       .expect(200)

//     const comments = await Comment.find({})
//     assert.strictEqual(comments.length, 1)
//     assert.strictEqual(comments[0].content, updatedComment.content)
//   })

//   test('a comment can be fetched', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = await new Comment({
//       authorId: users[0]._id,
//       storyId: stories[0]._id,
//       content: 'Comment1'
//     }).save()

//     const response = await api.get(`/api/comments/${newComment.id}`)
//     assert.strictEqual(response.body.authorId, newComment.authorId.toString())
//     assert.strictEqual(response.body.storyId, newComment.storyId.toString())
//     assert.strictEqual(response.body.content, newComment.content)
//   })
// })

// describe('when there are comments in db', () => {
//   beforeEach(async () => {
//     await Comment.deleteMany({})
//     await User.deleteMany({})
//     await Story.deleteMany({})

//     const user = await new User(
//       {
//         username: "username",
//         email: "user@example.com",
//         passwordHash: "pass123"
//       }
//     ).save()
    
//     const story = await new Story({
//       authorId: user._id,
//       title: 'Story1',
//       description: 'Description1',
//       content: 'Content1',
//       imageUrl: 'Image1'
//     }).save()
    
//     await new Comment({
//       authorId: user.id,
//       storyId: story.id,
//       content: 'Comment1'
//     }).save()

//     await new Comment({
//       authorId: user.id,
//       storyId: story.id,
//       content: 'Comment2'
//     }).save()

//     await new Comment({
//       authorId: user.id,
//       storyId: story.id,
//       content: 'Comment3'
//     }).save()
//   })

//   test('all comments are returned', async () => {
//     const response = await api.get('/api/comments')
//     assert.strictEqual(response.body.length, 3)
//   })

//   test('a comment can be viewed', async () => {
//     const comments = await Comment.find({})
//     const comment = comments[0]

//     const response = await api.get(`/api/comments/${comment.id}`)
//     assert.strictEqual(response.body.authorId, comment.authorId.toString())
//     assert.strictEqual(response.body.storyId, comment.storyId.toString())
//     assert.strictEqual(response.body.content, comment.content)
//   })

//   test('a comment can be updated', async () => {
//     const comments = await Comment.find({})
//     const comment = comments[0]

//     const updatedComment = {
//       content: 'Comment4'
//     }

//     await api
//       .put(`/api/comments/${comment.id}`)
//       .send(updatedComment)
//       .expect(200)

//     const commentsAfterUpdate = await Comment.find({})
//     assert.strictEqual(commentsAfterUpdate.length, 3)
//     assert.strictEqual(commentsAfterUpdate[0].content, updatedComment.content)
//   })

//   test('a comment can be deleted', async () => {
//     const comments = await Comment.find({})
//     const comment = comments[0]

//     await api
//       .delete(`/api/comments/${comment.id}`)
//       .expect(204)

//     const commentsAfterDelete = await Comment.find({})
//     assert.strictEqual(commentsAfterDelete.length, 2)
//   })

//   test('a comment can be added', async () => {
//     const users = await User.find({})
//     const stories = await Story.find({})
//     const newComment = {
//       authorId: users[0]._id,
//       storyId: stories[0]._id,
//       content: 'Comment4'
//     }
//     await api
//       .post('/api/comments')
//       .send(newComment)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const comments = await Comment.find({})
//     assert.strictEqual(comments.length, 4)
//     assert.strictEqual(comments[3].content, newComment.content)
//   })
// })

// after(async () => {
//   await mongoose.connection.close()
// })
