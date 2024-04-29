import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { errorNotification, successNotification } from './components/notifications'
// import loginForm from './components/loginForm'
// import blogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showError = (message) => {
    setErrMessage(message)
    setTimeout(() => {
      setErrMessage(null)
    }, 5000)
  }

  const showSuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
    } catch(exception) {
      showError('Wrong credentials')
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      showSuccess('Logged out')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('Failed to logout')
    }

  }

  const loginForm = () => {
    return <form onSubmit={handleLogin}>
        <div>
            username: {' '}
            <input type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
            password: {' '}
            <input type="password" value={password} name="password" onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
  }
  const blogForm = () => {
    return <div>
      <h3> All blogs </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>
      < errorNotification message={errMessage} />
      < successNotification message={successMessage} />
      
      {user === null ?
      (
        <div>
          <p> Please log in!</p>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      
      )}
    </div>
  )
}

export default App