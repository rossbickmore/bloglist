import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const login = () => (
      <div>
        <div style={ errorMessage == null ? null : {border: "3px solid red", backgroundColor: "grey", padding: 5}}>
          {errorMessage}
        </div>
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
      </div> 
  )

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

  const notification = () => {
    return (
      <p>a new blog entitled {newBlog.title} has been added by {newBlog.author}</p>
    )
  }

  
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {login()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div style={newBlog === null ? null : {border : "3px solid green", backgroundColor: "grey"}}>
        {newBlog === null ? null : notification()}
      </div>
      {user.name} has logged in
      <button type="submit" onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default App;
