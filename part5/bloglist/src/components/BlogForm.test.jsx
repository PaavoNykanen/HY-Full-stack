import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


describe('BlogForm component', () => {

  test('submits correct data', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Blog title...')
    await user.type(titleInput, 'test title')

    const authorInput = screen.getByPlaceholderText('Blog author...')
    await user.type(authorInput, 'test author')

    const urlInput = screen.getByPlaceholderText('Blog url...')
    await user.type(urlInput, 'test url')

    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('test title')
    expect(createBlog.mock.calls[0][1]).toBe('test author')
    expect(createBlog.mock.calls[0][2]).toBe('test url')
  })
})
