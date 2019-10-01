const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].content).toBe("")
})


afterAll(() => {
  mongoose.connection.close()
})