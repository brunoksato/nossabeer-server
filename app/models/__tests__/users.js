const Boot = require('../../services/env').default

Boot()

const User = require('../index').User
const db = require('../../services/connection').default

beforeEach(async () => {
  await db.sync({ force: true })
})

test('users model exist', async () => {
  expect(User).toBeDefined()
})

describe('crud models users', () => {
  test('list', async () => {
    await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    await User.create({
      name: 'Bruno2',
      email: 'bruno2@gmail.com',
      password: '123456'
    })
    const result = await User.findAll()
    expect(result).toBeDefined()
    expect(result).toHaveLength(2)
  })

  test('get', async () => {
    await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
    await User.create({
      name: 'Bruno2',
      email: 'bruno2@gmail.com',
      password: '123456'
    })
    const result = await User.findOne({
      where: {
        name: 'Bruno'
      }
    })
    expect(result).toBeDefined()
    expect(result.name).toEqual('Bruno')
  })

  test('create', async () => {
    await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })
  })

  test('update', async () => {
    await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })

    await User.update(
      {
        name: 'Bruno2'
      },
      {
        where: {
          name: 'Bruno'
        }
      }
    )

    const result = await User.findOne({
      where: {
        name: 'Bruno2'
      }
    })
    expect(result).toBeDefined()
    expect(result.name).toEqual('Bruno2')
  })

  test('delete', async () => {
    await User.create({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      password: '123456'
    })

    await User.destroy({
      where: {
        name: 'Bruno'
      }
    })

    const result = await User.findOne({
      where: {
        name: 'Bruno2'
      }
    })
    expect(result).toBeNull()
  })
})
