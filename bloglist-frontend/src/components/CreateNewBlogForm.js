import React from 'react';
import Blog from './Blog'

function CreateNewBlogForm({newBlog, user, blogs, handleSubmit, addBlog, handleAuthorChange, handleTitleChange, handleUrlChange }) {

    return (
        <div>
          <h2>blogs</h2>
          <div style={newBlog === null ? null : {border : "3px solid green", backgroundColor: "grey"}}>
            {newBlog === null ? null : <p>a new blog entitled {newBlog.title} has been added by {newBlog.author}</p>}
          </div>
          {user.name} has logged in
          <button type="submit" onClick={handleSubmit}>logout</button>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
          <h2>Add blog</h2>
          <form onSubmit={addBlog}>
            <div>
              title
              <input value={handleTitleChange} />
            </div>
            <div>
              author
              <input value={handleAuthorChange} />
            </div>
            <div>
              url
              <input value={handleUrlChange} />
            </div>
            <button type="submit">add blog</button>
          </form>
        </div>
    );
}


export default CreateNewBlogForm