const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user.model')

describe("initially users are empty", () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('a user can be added', async () => {
    const newUser = {
      "username": "username",
      "email": "username@example.com",
      "password": "Username1!"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    assert.strictEqual(users.length, 1)
    assert.strictEqual(users[0].username, newUser.username)
    assert.strictEqual(users[0].name, newUser.username)
    assert.strictEqual(users[0].email, newUser.email)
  })

  test('a user without username is not added', async () => {
    const newUser = {
      "email": "username@example.com",
      "password": "Username1!"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a user without email is not added', async () => {
    const newUser = {
      "username": "username",
      "password": "Username1!"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a user without password is not added', async () => {
    const newUser = {
      "username": "username",
      "email": "username@example.com",
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})