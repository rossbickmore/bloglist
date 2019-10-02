import React from 'react';

function CreateNewBlogForm({addBlog, handleAuthorChange, handleTitleChange, handleUrlChange }) {
    return (
        <div>
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