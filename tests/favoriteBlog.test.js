const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithManyBlogs = [
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
      },
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'asoidsonid',
          author: 'Ross Bickmore',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 10,
          __v: 0
      },
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'sdjndksanjdks',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 0,
          __v: 0
      },
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'dsadsd',
          author: 'Ross Bickmore',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 9,
          __v: 0
      },
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Gsdsads',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 2,
          __v: 0
      }
    ]

  
    test('when list has only one blog, the most favorite blog is ', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('when list has many blogs, the most favorite blog is', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
          title: 'asoidsonid',
          author: 'Ross Bickmore',
          likes: 10
      })
    })
})