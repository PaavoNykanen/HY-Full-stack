import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'chai'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {

  let container
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://test.com',
    likes: 0,
  }

  const likeHandler = vi.fn()
  const deleteHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={null} updateBlog={likeHandler} removeBlog={deleteHandler} />
    ).container
  })

  test('renders minimal blog content initially', async () => {

    const component = container.querySelector('.blogContainer')
    expect(component).toBeDefined()

    expect(component).toHaveTextContent('Test blog')
    expect(component).toHaveTextContent('Test author')

    expect(component).not.toHaveTextContent('http://test.com')
    expect(component).not.toHaveTextContent('0')

  })

  test('renders all blog content when view button is pressed', async () => {

    const component = container.querySelector('.blogContainer')
    expect(component).toBeDefined()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(component).toHaveTextContent('Test blog')
    expect(component).toHaveTextContent('Test author')

    expect(component).toHaveTextContent('http://test.com')
    expect(component).toHaveTextContent('0')

  })

  test('like button registers clicks', async () => {

    const component = container.querySelector('.blogContainer')
    expect(component).toBeDefined()

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await likeButton.click(likeButton)
    await likeButton.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})