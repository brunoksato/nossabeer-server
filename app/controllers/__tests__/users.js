import app from '../../index'
import supertest from 'supertest'
import Boot from '../../services/env'

Boot()
const models = require('../../models/index')
const User = models.User

let request, server

beforeEach(async () => {
  await User.sync({ force: true })
  server = app.listen(8080)
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('POST /api/signin', () => {
  test('should give me a token if credentials are valid', async () => {
    const user = {
      email: 'bruno@gmail.com',
      password: '123456'
    }
    const userCreate = Object.assign(
      {
        name: 'Bruno'
      },
      user
    )
    userCreate.password = await User.encryptPassword(user.password)
    await User.create(userCreate)
    const response = await request
      .post('/api/signin')
      .set('Content-type', 'application/json')
      .type('json')
      .send(user)

    expect(response.status).toEqual(200)
    expect(response.body.user.name).toEqual('Bruno')
    expect(response.body.user.email).toEqual('bruno@gmail.com')
  })

  test('should throw 401 is credentials are incorrect', async () => {
    const user = {
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    }
    const response = await request.post('/api/signin').send(user)
    expect(response.status).toEqual(400)
  })
})

describe('POST /api/signup', () => {
  test('should create a new user', async () => {
    const user = {
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    }
    const response = await request
      .post('/api/signup')
      .set('Content-type', 'application/json')
      .type('json')
      .send(user)

    expect(response.status).toEqual(201)
    expect(response.body.success).toEqual(true)
  })
})
