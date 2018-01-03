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

describe('POST /public/signin', () => {
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
      .post('/public/signin')
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
    const response = await request.post('/public/signin').send(user)
    expect(response.status).toEqual(400)
  })
})

describe('POST /public/signup', () => {
  test('should create a new user', async () => {
    const user = {
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    }
    const response = await request
      .post('/public/signup')
      .set('Content-type', 'application/json')
      .type('json')
      .send(user)

    expect(response.status).toEqual(201)
    expect(response.body.success).toEqual(true)
  })
})

describe('POST /api/users/me', () => {
  test('should get logged user', async () => {
    const user = {
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    }
    user.password = await User.encryptPassword(user.password)
    const getUser = await User.create(user)
    const token = User.genToken(getUser.get('id'), {
      expiresIn: 525949
    })
    const response = await request.get('/api/users/me').set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.email).toEqual(getUser.get('email'))
  })
})
