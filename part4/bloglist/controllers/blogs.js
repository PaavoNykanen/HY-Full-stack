const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(blogId)

  if (blog.user.toString() !== request.user) {
    return response.status(401).json({ error: 'not authorized' })
  }

  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(updatedBlog)
})

module.exports = blogRouter