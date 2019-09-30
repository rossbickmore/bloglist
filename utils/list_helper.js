const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
      totalLikes += blogs[i].likes
  }
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else {
     let result = {}
      let mostLikes = blogs[0].likes
      for (let i = 1; i < blogs.length - 1; i++) {
      if (blogs[i].likes > mostLikes) {
        mostLikes = blogs[i].likes
        result.title = blogs[i].title
        result.author = blogs[i].author
        result.likes = blogs[i].likes
        }
    return result
    }
  }
}

const mostBlogs = (blogs) => {

  const uniqAuthors = (blogs) => {
    let result = [blogs[0].author]
    for (let i = 1; i < blogs.length -1; i++) {
      if (result.indexOf(blogs[i].author) === -1) {
        result.push(blogs[i].author)
      }
    }
    return result
  }
  
  const countBlogs = (blogs, author) => {
    let numberOfBlogs = 0
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].author == author) {
        numberOfBlogs++
      }
    }
    return numberOfBlogs
  }

  let arr = uniqAuthors(blogs)
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let obj = {
      author: arr[i],
      blogs: countBlogs(blogs,arr[i])
    }
    result.push(obj)
  }
  return result.sort( (a,b) => b.blogs - a.blogs)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}