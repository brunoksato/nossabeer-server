import Boot from '../../services/env'

Boot()
const models = require('../index')
const City = models.City

beforeEach(async () => {
  await City.sync({ force: true })
})

test('city model exist', async () => {
  expect(City).toBeDefined()
})

test('list city', async () => {
  await City.create({
    name: 'Sao Paulo'
  })
  await City.create({
    name: 'Sao Paulo'
  })
  const result = await City.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get city', async () => {
  await City.create({
    name: 'Sao Paulo'
  })
  await City.create({
    name: 'Sao Paulo'
  })
  const result = await City.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Sao Paulo')
})

test('create city', async () => {
  await City.create({
    name: 'Sao Paulo'
  })
})

test('update city', async () => {
  await City.create({
    name: 'Sao Paulo'
  })

  await City.update(
    {
      name: 'Sao Paulo'
    },
    {
      where: {
        name: 'Sao Paulo'
      }
    }
  )

  const result = await City.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Sao Paulo')
})

test('delete city', async () => {
  await City.create({
    name: 'Sao Paulo'
  })

  await City.destroy({
    where: {
      name: 'Sao Paulo'
    }
  })

  const result = await City.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeNull()
})
