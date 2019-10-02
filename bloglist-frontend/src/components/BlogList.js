import React from 'react';
import Blog from './Blog'

const BlogList = ({newBlog, blogs, handleLogout, user}) => {
    return (
        <div>
          <h2>blogs</h2>
          <div style={newBlog === null ? null : {border : "3px solid green", backgroundColor: "grey"}}>
            {newBlog === null ? null : <p>a new blog entitled {newBlog.title} has been added by {newBlog.author}</p>}
          </div>
          {user.name} has logged in
          <button type="submit" onClick={handleLogout}>logout</button>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs}/>
          )}
        </div>
    );
};

export default BlogList;