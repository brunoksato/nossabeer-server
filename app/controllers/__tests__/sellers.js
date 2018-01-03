import app from '../../index'
import supertest from 'supertest'
import Boot from '../../services/env'

Boot()
const models = require('../../models/index')
const Seller = models.Seller
const User = models.User
const Token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'

let request, server

beforeEach(async () => {
  await Seller.sync({ force: true })
  await User.sync({ force: true })
  server = app.listen(8080)
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('GET /api/sellers', () => {
  test('should list sellers', async () => {
    const user1 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const user2 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const seller1 = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user1.get('id')
    }
    const seller2 = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user2.get('id')
    }
    await Seller.create(seller1)
    await Seller.create(seller2)
    const response = await request.get('/public/sellers')

    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(2)
  })
})

describe('GET /api/sellers/:id', () => {
  test('should get seller', async () => {
    const user1 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const seller1 = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user1.get('id')
    }
    const seller = await Seller.create(seller1)
    const response = await request.get(`/public/sellers/${seller.get('id')}`)

    expect(response.status).toEqual(200)
    expect(response.body.cnpj).toEqual('11111111111111')
  })
})

describe('POST /api/sellers', () => {
  test('should create seller', async () => {
    const user1 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const seller = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user1.get('id')
    }
    const response = await request
      .post('/api/signup')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${Token}`)
      .type('json')
      .send(seller)

    expect(response.status).toEqual(200)
    expect(response.body.cnpj).toEqual('11111111111111')
  })
})

describe('PUT /api/sellers/:id', () => {
  test('should update seller', async () => {
    const user1 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const seller = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user1.get('id')
    }
    const sellerCreated = await Seller.create(seller)
    const sellerUpdate = {
      cnpj: '2222222222222'
    }
    const response = await request
      .put(`/api/signup/${sellerCreated.get('id')}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${Token}`)
      .type('json')
      .send(sellerUpdate)

    expect(response.status).toEqual(200)
    expect(response.body.cnpj).toEqual('2222222222222')
  })
})

describe('DELETE /api/seller/:id', () => {
  test('should delete seller', async () => {
    const user1 = await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    const seller = {
      cnpj: '11111111111111',
      type: 'freelance',
      facebook: 'https://facebook.com/mypage',
      user_id: user1.get('id')
    }
    const sellerCreated = await Seller.create(seller)
    const response = await request
      .delete(`/api/signup/${sellerCreated.get('id')}`)
      .set('Authorization', `Bearer ${Token}`)

    expect(response.status).toEqual(200)

    const sellerExist = await Seller.findById(sellerCreated.get('id'))
    expect(sellerExist).toBeNull()
  })
})
