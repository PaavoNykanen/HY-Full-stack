import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const noteFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(b =>
      setBlogs(b)
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({        
        username, password,
      })

      window.localStorage.setItem(        
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setSuccessMessage(`Logged in as ${user.username}`)
      setTimeout(() => {        
        setSuccessMessage(null)      
      }, 5000)
    } catch (exception) {
      console.log('Wrong credentials', exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setSuccessMessage(`Logged out`)
    setTimeout(() => {        
      setSuccessMessage(null)      
    }, 5000)
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
  )

  const handleCreateBlog = async (title, author, url) => {
    noteFormRef.current.toggleVisibility()
    blogService.create({
      title: title,
      author: author,
      url: url,
    }).then(b => {
      setBlogs(blogs.concat(b))
      setSuccessMessage(`A new blog ${b.title} by ${b.author} added`)
      setTimeout(() => {        
        setSuccessMessage(null)      
      }, 5000)
    }).catch(error => {
      setErrorMessage('Failed to create a new blog')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
    })
  }

  const handleUpdateBlog = async (blog) => {
    blogService.update({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }, blog.id).then(b => {
      const newBlogs = blogs.map(b => b.id === blog.id ?
        { 
          ...b, 
          likes: b.likes + 1 
        } 
        : b)
      setBlogs(newBlogs)
      setSuccessMessage(`Blog was updated`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(error => {
      setErrorMessage('Failed to update blog')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
    })
  }

  const handleRemoveBlog = async (blog) => {
    blogService.remove(blog.id)
      .then(b => {
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
      setSuccessMessage(`Blog was removed`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(error => {
      setErrorMessage('Failed to remove blog')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
    })
  }

  return (
    <div>
      <Notification message={errorMessage} color='red' />
      <Notification message={successMessage} color='green' />
      {user === null ? (
        <div>
          <h2>log in to application</h2>
           {LoginForm()}
        </div>
      ) : (
      <div>
        <h2>blogs</h2>
        <p>
          {username} logged in 
          <button onClick={handleLogout}>logout</button>
        </p>

        <Togglable buttonLabel="new blog" ref={noteFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        {blogs.sort((a, b) => a.likes < b.likes).map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog}
            user={user} 
            updateBlog={handleUpdateBlog}
            removeBlog={handleRemoveBlog}
          />
        )}
      </div>
      )}
    </div>
  )
}

export default App