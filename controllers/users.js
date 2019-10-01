const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    if (body.username === undefined || body.password === undefined) {
        return response.status(400).json({ error: 'password or username is invalid' })
    }
    if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'password or username must be over 3 characters long' })
    }
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter