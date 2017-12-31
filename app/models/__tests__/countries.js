import Boot from '../../services/env'

Boot()
const models = require('../index')
const Country = models.Country

beforeEach(async () => {
  await Country.sync({ force: true })
})

test('country model exist', async () => {
  expect(Country).toBeDefined()
})

test('list country', async () => {
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })
  const result = await Country.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get country', async () => {
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })
  const result = await Country.findOne({
    where: {
      name: 'Brasil'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Brasil')
})

test('create country', async () => {
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })
})

test('update country', async () => {
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })

  await Country.update(
    {
      name: 'Brasil'
    },
    {
      where: {
        name: 'Brasil'
      }
    }
  )

  const result = await Country.findOne({
    where: {
      name: 'Brasil'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Brasil')
})

test('delete country', async () => {
  await Country.create({
    name: 'Brasil',
    initial: 'BR'
  })

  await Country.destroy({
    where: {
      name: 'Brasil'
    }
  })

  const result = await Country.findOne({
    where: {
      name: 'Brasil'
    }
  })
  expect(result).toBeNull()
})
