import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNewBlogForm from './components/CreateNewBlogForm'

function App() {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [blogs, setBlogs] = useState([]) 
  const [newBlog, setNewBlog] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }
    setNewBlog(blogObject)
    setTimeout(() => {
      setNewBlog(null)
    }, 5000)
    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  
  
  if (user === null) {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage={errorMessage}
        />
      </div>
    )
  }

  return (
    <div>
        <CreateNewBlogForm 
          user={user}
          newBlog={newBlog}
          blogs={blogs}
          addBlog={addBlog}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleLogout}
        />
      </div>
  )
}

export default App;
