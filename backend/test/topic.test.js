// const { test, after, describe, beforeEach } = require('node:test')
// const assert = require('node:assert');
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const api = supertest(app)
// const Topic = require('../models/topic.model')

// describe('initially topics are empty', () => {
//   beforeEach(async () => {
//     await Topic.deleteMany({})
//   })

//   test('topics are returned as json', async () => {
//     await api
//       .get('/api/topics')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })

//   test('check initally db is empty', async () => {
//     const response = await api.get('/api/topics')
//     assert.strictEqual(response.body.length, 0)
//   })

//   test('a topic can be added', async () => {
//     const newTopic = {
//       name: 'Math'
//     }
//     await api
//       .post('/api/topics')
//       .send(newTopic)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//     const topics = await Topic.find({})
//     assert.strictEqual(topics.length, 1)
//     assert.strictEqual(topics[0].name, newTopic.name)
//     assert.strictEqual(topics[0].stories.length, 0)
//   })

//   test('a topic without name is not added', async () => {
//     const newTopic = {}
//     await api
//       .post('/api/topics')
//       .send(newTopic)
//       .expect(400)
//     const topics = await Topic.find({})
//     assert.strictEqual(topics.length, 0)
//   })
// })

// describe("initial topics are not empty", () => {
//   beforeEach(async () => {
//     await Topic.deleteMany({})
//     await new Topic({name: 'Math'}).save()
//     await new Topic({name: 'Physics'}).save()
//     await new Topic({name: 'Art'}).save()
//   })

//   test('all topics are returned', async () => {
//     const response = await api.get('/api/topics')
//     assert.strictEqual(response.body.length, 3)
//   })

//   test('duplicate topics are not allowed', async () => {
//     const newTopic = {
//       name: 'Physics'
//     }
//     // MongoServerError. Duplicate key. Error code: 11000
//     await api
//       .post('/api/topics')
//       .send(newTopic)
//       .expect(400)
//   })

//   test('a specific topic can be viewed', async () => {
//     const topics = await Topic.find({})
//     const topic = topics[0]
//     const response = await api.get(`/api/topics/${topic.id}`)
//     assert.strictEqual(response.body.name, topic.name)
//   })

//   test('a topic can be deleted', async () => {
//     const topics = await Topic.find({})
//     const deletedTopic = topics[0]
//     await api
//       .delete(`/api/topics/${deletedTopic.id}`)
//       .expect(204)
//     const topicsAfterDelete = await Topic.find({})
//     assert.strictEqual(topicsAfterDelete.length, 2)
//     assert.strictEqual(topicsAfterDelete.some(topic => {
//       deletedTopic.id === topic.id
//     }), false)
//   })

//   test('a topic can be updated', async () => {
//     const topics = await Topic.find({})
//     const updatedTopic = topics[0]
//     updatedTopic.name = 'Biology'
//     await api
//       .put(`/api/topics/${updatedTopic.id}`)
//       .send(updatedTopic)
//       .expect(200)
//     const topicsAfterUpdate = await Topic.find({})
//     assert.strictEqual(topicsAfterUpdate.length, 3)
//     assert.strictEqual(topicsAfterUpdate[0].name, updatedTopic.name)
//   })
// })

// after(async () => {
//   await mongoose.connection.close()
// })