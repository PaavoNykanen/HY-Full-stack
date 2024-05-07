import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {visible ? (
            <button onClick={() => setVisible(false)}>hide</button>
          ) : (
            <button onClick={() => setVisible(true)}>view</button>
          )}
      </div>

      {visible && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>
            {blog.user?.name}
          </div>
        </div>
      )}

    </div>
  )
}

export default Blog