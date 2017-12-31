import Boot from '../../services/env'

Boot()
const models = require('../index')
const Message = models.Message

beforeEach(async () => {
  await Message.sync({ force: true })
})

test('message model exist', async () => {
  expect(Message).toBeDefined()
})

test('list message', async () => {
  await Message.create({
    text: 'New message',
    read: false
  })
  await Message.create({
    text: 'New message 2',
    read: false
  })
  const result = await Message.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get message', async () => {
  await Message.create({
    text: 'New message',
    read: false
  })
  await Message.create({
    text: 'New message 2',
    read: false
  })
  const result = await Message.findOne({
    where: {
      text: 'New message'
    }
  })
  expect(result).toBeDefined()
  expect(result.text).toEqual('New message')
})

test('create message', async () => {
  await Message.create({
    text: 'New message',
    read: false
  })
})

test('update message', async () => {
  await Message.create({
    text: 'New message',
    read: false
  })

  await Message.update(
    {
      text: 'New message'
    },
    {
      where: {
        text: 'New message'
      }
    }
  )

  const result = await Message.findOne({
    where: {
      text: 'New message'
    }
  })
  expect(result).toBeDefined()
  expect(result.text).toEqual('New message')
})

test('delete message', async () => {
  await Message.create({
    text: 'New message',
    read: false
  })

  await Message.destroy({
    where: {
      text: 'New message'
    }
  })

  const result = await Message.findOne({
    where: {
      text: 'New message'
    }
  })
  expect(result).toBeNull()
})
