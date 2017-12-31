import Boot from '../../services/env'

Boot()
const models = require('../index')
const User = models.User

beforeEach(async () => {
  await User.sync({ force: true })
})

test('user model exist', async () => {
  expect(User).toBeDefined()
})

test('list users', async () => {
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

test('get users', async () => {
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

test('create users', async () => {
  await User.create({
    name: 'Bruno',
    email: 'bruno@gmail.com',
    password: '123456'
  })
})

test('update users', async () => {
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

test('delete users', async () => {
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
      name: 'Bruno'
    }
  })
  expect(result).toBeNull()
})
