import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addedBy = () => blog.user.username ? blog.user.username : "user unavailable"

  return (
    <div style={blogStyle}>
    <div onClick={toggleVisibility}>
      {blog.title} {blog.author}
    <div style={showWhenVisible}>
      <div>
      link: {blog.url}
      </div>
      <div>
      likes: {blog.likes}
      <button>like</button>
      </div>
      <div> 
      added by {addedBy}
      </div>
    </div>
    </div>
  </div>
  )
}

export default Blog