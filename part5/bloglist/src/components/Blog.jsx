import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogContainer' data-testid={`blog-${blog.title}`}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          <div>
            {blog.user?.name}
          </div>
          {user?.username === blog.user?.username && (
            <button onClick={() => removeBlog(blog)}>remove</button>
          )}
        </div>
      )}

    </div>
  )
}

export default Blog