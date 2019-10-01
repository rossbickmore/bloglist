const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(5)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "What a silly billy",
    author: "David Lithario",
    url: "youtube.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body.length).toBe(7)
  expect(title).toContain(
    "What a silly billy"
  )
})


afterAll(() => {
  mongoose.connection.close()
})