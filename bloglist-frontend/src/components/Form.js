import React from 'react';
import blogService from '../services/blogs'

function Form(props) {

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = {
                title: title,
                author: author,
                url: url,
            }
            setNewblog(blog)
          blogService.create(newBlog)
          setTitle('')
          setAuthor('')
          setUrl('')
          setNewBlog('')
        } catch (exception) {
          setErrorMessage('Invalid blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <input value={title} onClick={({target} => setTitle(target.value))}>title:</input>
                <input value={author} onClick={({target} => setAuthor(target.value))}>author:</input>
                <input value={url} onClick={({target} => setUrl(target.value))}>url:</input>
            </form>
        </div>
    );


export default Form