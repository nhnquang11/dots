const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Story = require('../models/story.model')
const User = require('../models/user.model')

describe('initially stories are empty, one user in db', () => {
  beforeEach(async () => {
    await Story.deleteMany({})
    await User.deleteMany({})

    await new User(
      {
        username: "username",
        email: "user@example.com",
        passwordHash: "pass123"
      }
    ).save()
  })

  test('stories are returned as json', async () => {
    await api
      .get('/api/stories')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check initally db is empty', async () => {
    const response = await api.get('/api/stories')
    assert.strictEqual(response.body.length, 0)
  })

  test('a story can be added', async () => {
    const users = await User.find({})

    const newStory = {
      authorId: users[0]._id,
      title: 'Story1',
      description: 'Description1',
      content: 'Content1',
      imageUrl: 'Image1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 1)
    assert.strictEqual(stories[0].title, newStory.title)
    assert.strictEqual(stories[0].description, newStory.description)
    assert.strictEqual(stories[0].content, newStory.content)
    assert.strictEqual(stories[0].imageUrl, newStory.imageUrl)
  })

  test('a story without title is not added', async () => {
    const users = await User.find({})

    const newStory = {
      authorId: users[0]._id,
      description: 'Description1',
      content: 'Content1',
      imageUrl: 'Image1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(400)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 0)
  })

  test('a story without description is not added', async () => {
    const users = await User.find({})

    const newStory = {
      authorId: users[0]._id,
      title: 'Story1',
      content: 'Content1',
      imageUrl: 'Image1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(400)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 0)
  })

  test('a story without content is not added', async () => {
    const users = await User.find({})

    const newStory = {
      authorId: users[0]._id,
      title: 'Story1',
      description: 'Description1',
      imageUrl: 'Image1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(400)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 0)
  })

  test('a story without imageUrl is not added', async () => {
    const users = await User.find({})

    const newStory = {
      authorId: users[0]._id,
      title: 'Story1',
      description: 'Description1',
      content: 'Content1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(400)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 0)
  })

  test('a story without authorId is not added', async () => {
    const newStory = {
      title: 'Story1',
      description: 'Description1',
      content: 'Content1',
      imageUrl: 'Image1'
    }

    await api
      .post('/api/stories')
      .send(newStory)
      .expect(400)

    const stories = await Story.find({})
    assert.strictEqual(stories.length, 0)
  })
})

describe('there are stories in db', () => {
  beforeEach(async () => {
    await Story.deleteMany({})
    await User.deleteMany({})
    
    const user = await new User(
      {
        username: "username",
        email: "user@example.com",
        passwordHash: "pass123"
      }
    ).save()

    new Story({
      authorId: user._id,
      title: 'Story1',
      description: 'Description1',
      content: 'Content1',
      imageUrl: 'Image1'
    }).save()

    new Story({
      authorId: user._id,
      title: 'Story2',
      description: 'Description2',
      content: 'Content2',
      imageUrl: 'Image2'
    }).save()

    new Story({
      authorId: user._id,
      title: 'Story3',
      description: 'Description3',
      content: 'Content3',
      imageUrl: 'Image3'
    }).save()
  })

  test('all stories are returned', async () => {
    const response = await api.get('/api/stories')
    assert.strictEqual(response.body.length, 3)
  })


  test('a story can be viewed', async () => {
    const stories = await Story.find({})
    const story = stories[0]

    const response = await api.get(`/api/stories/${story.id}`)
    assert.strictEqual(response.body.authorId, story.authorId.toString())
    assert.strictEqual(response.body.title, story.title)
    assert.strictEqual(response.body.description, story.description)
    assert.strictEqual(response.body.content, story.content)
    assert.strictEqual(response.body.imageUrl, story.imageUrl)
  })

  test('a story can be deleted', async () => {
    const stories = await Story.find({})
    const story = stories[0]

    await api
      .delete(`/api/stories/${story.id}`)
      .expect(204)
    
    const newStories = await Story.find({})
    assert.strictEqual(newStories.length, 2)
  })

  test('a story can be updated', async () => {
    const stories = await Story.find({})
    const story = stories[0]

    const updatedStory = {
      title: 'UpdatedTitle',
      description: 'UpdatedDescription',
      content: 'UpdatedContent',
      imageUrl: 'UpdatedImage'
    }

    await api
      .put(`/api/stories/${story.id}`)
      .send(updatedStory)
      .expect(200)

    const newStories = await Story.find({})
    assert.strictEqual(newStories.length, 3)
    assert.strictEqual(newStories[0].title, updatedStory.title)
    assert.strictEqual(newStories[0].description, updatedStory.description)
    assert.strictEqual(newStories[0].content, updatedStory.content)
    assert.strictEqual(newStories[0].imageUrl, updatedStory.imageUrl)
  })
})


after(async () => {
  await mongoose.connection.close()
})