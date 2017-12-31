import app from '../../index'
import supertest from 'supertest'

let request, server

beforeEach(() => {
  server = app.listen(8080)
  request = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('GET /api', () => {
  test('should give me a api message', async () => {
    const response = await request.get('/api')
    expect(response.status).toEqual(200)
    expect(response.body.API).toEqual('NOSSABEER API')
  })
})
