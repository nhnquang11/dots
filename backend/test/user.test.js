// const { test, after, describe, beforeEach } = require('node:test')
// const assert = require('node:assert');
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const api = supertest(app)
// const User = require('../models/user.model')

// describe("initially users are empty", () => {
//   beforeEach(async () => {
//     await User.deleteMany({})
//   })

//   test('users are returned as json', async () => {
//     await api
//       .get('/api/users')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })

//   test('check initally db is empty', async () => {
//     const response = await api.get('/api/users')
//     assert.strictEqual(response.body.length, 0)
//   })

//   test('a user can be added', async () => {
//     const newUser = {
//       username: "username1",
//       email: "username1@example.com",
//       passwordHash: "username1"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 1)
//     assert.strictEqual(users[0].username, newUser.username)
//     assert.strictEqual(users[0].email, newUser.email)
//     assert.strictEqual(users[0].passwordHash, newUser.passwordHash)
//   })


//   test('a user without username is not added', async () => {
//     const newUser = {
//       email: "username1@example.com",
//       passwordHash: "username1"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 0)
//   })

//   test('a user without email is not added', async () => {
//     const newUser = {
//       username: "username1",
//       passwordHash: "username1"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 0)
//   })

//   test('a user without password is not added', async () => {
//     const newUser = {
//       username: "username1",
//       email: "username1@example.com"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 0)
//   })
// })

// describe("initial users are not empty", () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     await new User({
//       username: "username1",
//       email: "username1@example.com",
//       passwordHash: "pass1"
//     }).save()

//     await new User({
//       username: "username2",
//       email: "username2@example.com",
//       passwordHash: "pass2"
//     }).save()

//     await new User({
//       username: "username3",
//       email: "username3@example.com",
//       passwordHash: "pass3"
//     }).save()
//   })

//   test('all users are returned', async () => {
//     const response = await api.get('/api/users')
//     assert.strictEqual(response.body.length, 3)
//   })

//   test('duplicate username are not allowed', async () => {
//     const newUser = {
//       username: "username1",
//       email: "username1@example.com",
//       passwordHash: "pass1"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 3)
//   })

//   test('duplicate email are not allowed', async () => {
//     const newUser = {
//       username: "userrrr",
//       email: "username1@example.com",
//       passwordHash: "pass1"
//     }
//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//     const users = await User.find({})
//     assert.strictEqual(users.length, 3)
//   })

//   test('a user can be deleted', async () => {
//     const users = await User.find({})
//     const id = users[0]._id.toString()
//     await api
//       .delete(`/api/users/${id}`)
//       .expect(204)
//     const newUsers = await User.find({})
//     assert.strictEqual(newUsers.length, 2)
//   })

//   test('a specific user can be viewed', async () => {
//     const users = await User.find({})
//     const user = users[0]
//     const response = await api.get(`/api/users/${user.id}`)
//     assert.strictEqual(response.body.username, user.username)
//   })

//   test('a user can be updated', async () => {
//     const users = await User.find({})
//     const user = users[0]
//     const updatedUser = {
//       username: "hihihaha",
//     }
//     await api
//       .put(`/api/users/${user.id}`)
//       .send(updatedUser)
//       .expect(200)
//     const newUsers = await User.find({})
//     assert.strictEqual(newUsers.length, 3)
//     assert.strictEqual(newUsers[0].username, updatedUser.username)
//   })
// })

// after(async () => {
//   await mongoose.connection.close()
// })