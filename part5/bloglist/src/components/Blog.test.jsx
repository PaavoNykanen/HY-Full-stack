import { render } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'chai'

test('renders minimal blog content', async () => {

  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://test.com',
    likes: 0,
  }

  const likeHandler = vi.fn()
  const deleteHandler = vi.fn()


  const container = render(
    <Blog blog={blog} user={null} updateBlog={likeHandler} removeBlog={deleteHandler} />
  ).container

  const component = container.querySelector('.blogContainer')
  expect(component).toBeDefined()

  expect(component).toHaveTextContent('Test blog')
  expect(component).toHaveTextContent('Test author')

  expect(component).not.toHaveTextContent('http://test.com')
  expect(component).not.toHaveTextContent('0')

})