import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { ErrorNotification, SuccessNotification } from './components/notifications'
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

  // blogs content
  const [title, setTitle] = useState('')  
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  // show error message
  const showError = (message) => {
    setErrMessage(message)
    setTimeout(() => {
      setErrMessage(null)
    }, 5000)
  }

  // show success message
  const showSuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  // reset form
  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')  
    setUsername('')
    setPassword('')
  }

  // handle login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      resetForm()
      setUsername('')
      showSuccess(`Welcome ${user.name}, you are logged in`)
    } catch(exception) {
      showError('Wrong credentials')
    }

  }

  // handle logout
  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      showSuccess('Logged out')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      resetForm()
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('Failed to logout')
    }

  }

  // handle create blog
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        showSuccess(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
        resetForm()
      })
      .catch(error => {
        showError(`Failed to create a new blog: ${error.response.data.error}`)
      })
  }

  // login form
  const loginForm = () => {
    return <form onSubmit={handleLogin}>
        <div>
            username:
            <input type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
            password:
            <input type="password" value={password} name="password" onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
  }

  // create blog form
  const blogForm = () => {
    return <div>
      <h3> Create new blogs </h3>
      <form onSubmit={handleCreateBlog}>
        <input type="text" value={title} placeholder="Title" name="title" onChange={({target}) => setTitle(target.value)} />
        <br />
        <input type="text" value={author} name="author" placeholder="Author" onChange={({target}) => setAuthor(target.value)} />
        <br />
        <input type="text" value={url} name="url" placeholder="URL" onChange={({target}) => setUrl(target.value)} />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  }

  // show blogs
  const showBlogs = () => {
    return <div>
      <h3> Blogs </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  }

  // login view component
  const loginPage = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        < ErrorNotification message={errMessage} />
        < SuccessNotification message={successMessage} />
        {loginForm()}
      </div> 
    )
  }

  // blog view component
  const blogPage = () => {
    return (
      <div>
        <h2>blogs</h2>
        < ErrorNotification message={errMessage} />
        < SuccessNotification message={successMessage} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogForm()}
        {showBlogs()}
      </div>
    )
   }

  return (
    <div>
      {user === null ?
      (
        loginPage()
      ) : (
        blogPage()  
      )}
    </div>
  )
}

export default App