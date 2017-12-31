import Boot from '../../services/env'

Boot()
const models = require('../index')
const Notification = models.Notification

beforeEach(async () => {
  await Notification.sync({ force: true })
})

test('notification model exist', async () => {
  expect(Notification).toBeDefined()
})

test('list notification', async () => {
  await Notification.create({
    title: 'New message',
    link: 'https://google.com',
    read: false
  })
  await Notification.create({
    title: 'New message 2',
    link: 'https://google.com',
    read: false
  })
  const result = await Notification.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get notification', async () => {
  await Notification.create({
    title: 'New message',
    link: 'https://google.com',
    read: false
  })
  await Notification.create({
    title: 'New message 2',
    link: 'https://google.com',
    read: false
  })
  const result = await Notification.findOne({
    where: {
      title: 'New message'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('New message')
})

test('create notification', async () => {
  await Notification.create({
    title: 'New message',
    link: 'https://google.com',
    read: false
  })
})

test('update notification', async () => {
  await Notification.create({
    title: 'New message',
    link: 'https://google.com',
    read: false
  })

  await Notification.update(
    {
      title: 'New message'
    },
    {
      where: {
        title: 'New message'
      }
    }
  )

  const result = await Notification.findOne({
    where: {
      title: 'New message'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('New message')
})

test('delete notification', async () => {
  await Notification.create({
    title: 'New message',
    link: 'https://google.com',
    read: false
  })

  await Notification.destroy({
    where: {
      title: 'New message'
    }
  })

  const result = await Notification.findOne({
    where: {
      title: 'New message'
    }
  })
  expect(result).toBeNull()
})
