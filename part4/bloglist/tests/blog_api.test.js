const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')


describe('blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('includes two blogs initially', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('items include id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog['id'])
    })
  })

  describe('viewing a specific blog', () => {
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
  })
  describe('creating blogs', () => {
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

  describe('deleting a blog', () => {

    test('is successful with a valid id', async () => {
      // Add blog to be deleteted and check that its added
      const newBlog = {
        title: 'Blog to delete',
        author: 'Delete Author',
        url: 'delete.url.com',
      }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const addedBlogId = addedBlog.body.id
      const deletedBlog = await api
        .delete(`/api/blogs/${addedBlogId}`)
        .expect(204)

      // Check that the blog doesnt exist and db is the same as at the start
      const blogsAfterDelete = await helper.blogsInDb()
      assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length)

      const titles = blogsAfterDelete.map(b => b.title)
      assert(!titles.includes('Blog to delete'))

    })
  })

  describe('updating a blog', () => {

    test('is successful with a valid id', async () => {
      const blogsAfterSetup = await helper.blogsInDb()
      const blogToUpdate = blogsAfterSetup[0]
      const newBlog = {
        title: 'Updated Title',
      }
      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // New blogs were not added, only modified, so the length should be the same
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      // Check that the blog was updated
      assert(updatedBlog.body.title === newBlog.title)

      // New title is in, old is not
      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes(newBlog.title))
      assert(!titles.includes(blogToUpdate.title))
    })

    test('is successful for adding one like', async () => {
      const blogsAfterSetup = await helper.blogsInDb()
      const blogToUpdate = blogsAfterSetup[0]
      const newBlog = {
        likes: blogToUpdate.likes + 1,
      }
      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Check that the blog was updated
      assert(updatedBlog.body.likes === blogToUpdate.likes + 1)

      // Likes exist in the updated blogs
      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(b => b.likes)
      assert(likes.includes(blogToUpdate.likes + 1))
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'test',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`username` is required'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password doesnt exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Given password is invalid'))
    
    // User is not added
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Given password is invalid'))
    
    // User is not added
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})