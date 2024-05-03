const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog api', () => {

  test('includes two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('items include id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog['id'])
    })
  })

  test('can add blogs', async () => {
    const newBlog = {
      title: 'Test Blog 3',
      author: 'Test Author 3',
      url: 'test.url.com',
      likes: 1000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Test Blog 3'))

    const authors = blogsAtEnd.map(b => b.author)
    assert(authors.includes('Test Author 3'))

    const urls = blogsAtEnd.map(b => b.url)
    assert(urls.includes('test.url.com'))

    const likes = blogsAtEnd.map(b => b.likes)
    assert(likes.includes(1000))
  })

  test('defaults blog to 0 likes if the property is missing', async () => {
    const newBlog = {
      title: 'Test Blog 3',
      author: 'Test Author 3',
      url: 'test.url.com',
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    assert(addedBlog.body.likes === 0)
  })

  test('returns code 400 if title is missing', async () => {
    const newBlog = {
      author: 'Test Author 3',
      url: 'test.url.com',
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'title or url missing' })

    // Length is not increased because the blog is not added
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    assert(addedBlog.status === 400)
  })

  test('returns code 400 if url is missing', async () => {
    const newBlog = {
      title: 'Test Blog 3',
      author: 'Test Author 3',
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'title or url missing' })

    // Length is not increased because the blog is not added
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    assert(addedBlog.status === 400)
  })
})

after(async () => {
  await mongoose.connection.close()
})