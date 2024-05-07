import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog(title, author, url)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return ( 
    <form onSubmit={handleSubmit}>
      <div>
        title:
          <input
            type="text"
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
      </div>
      <div>
        author:
          <input
            type="text"
            onChange={event => setAuthor(event.target.value)}
            value={author}
          />
      </div>
      <div>
        url:
          <input
            type="text"
            onChange={event => setUrl(event.target.value)}
            value={url}
          />
      </div>
      <button type="submit">create</button>
    </form> 
  )
}

export default BlogForm