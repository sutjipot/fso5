import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { ErrorNotification, SuccessNotification } from './components/notifications'
import showMessages from './components/notifications'
import { Button } from './components/small'
import { BlogForm } from './components/blogForm'
import { LoginForm } from './components/loginForm'
import { Togglable } from './components/togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errMessage, setError] = useState(null)
  const [successMessage, setSuccess] = useState(null)
  const { showSuccess, showError } = showMessages(setSuccess, setError)

  const buttonStyle = {
    cursor: 'pointer'
  }

  // get all blogs
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // get logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // handle login
  const handleLogin = (userObjects) => {
    loginService
      .login(userObjects)
      .then(returnedUser => {
        setUser(returnedUser)
        blogService.setToken(returnedUser.token)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(returnedUser))
        showSuccess(`Welcome ${returnedUser.name}, you are logged in`)
      })
      .catch(error => {
        showError(`Wrong credentials ${error.response.data.error}`)
      })
  }

  // handle logout
  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.clear()
      blogService.setToken(null)
      showSuccess('Logged out')
    } catch (exception) {
      showError('Failed to logout')
    }

  }

  // handle create blog
  const blogFormRef = useRef()
  const handleCreateBlog = (blogObjects) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObjects)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        showSuccess(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`)
      })
      .catch(error => {
        showError(`Failed to create a new blog: ${error.response.data.error}`)
      })
  }

  // show user
  const showUser = () => {
    return <div>
      <p>{user.name} logged in</p> <Button type='button' style={buttonStyle} onClick={handleLogout} text="Log Out"></Button>
    </div>
  }

  // show blogs
  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return <div>
      <h3> Click Blog for Details</h3>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          showSuccess={showSuccess}
          showError={showError}
        />
      )}
    </div>
  }

  // login view component
  const loginPage = () => {
    return (
      < LoginForm handleLogin={handleLogin} />
    )
  }

  // blog view component
  const blogPage = () => {
    return (
      <div>

        {showUser()}

        <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>

        {blogs.length === 0 ? <p>No blogs available</p> : showBlogs()}
      </div>
    )
  }


  return (
    <div>
      <h2> Blog List </h2>
      <ErrorNotification message={errMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ? loginPage() : blogPage()}
    </div>
  )
}

export default App