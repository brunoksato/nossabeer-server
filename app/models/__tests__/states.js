import Boot from '../../services/env'

Boot()
const models = require('../index')
const State = models.State

beforeEach(async () => {
  await State.sync({ force: true })
})

test('state model exist', async () => {
  expect(State).toBeDefined()
})

test('list state', async () => {
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })
  const result = await State.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get state', async () => {
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })
  const result = await State.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Sao Paulo')
})

test('create state', async () => {
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })
})

test('update state', async () => {
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })

  await State.update(
    {
      name: 'Sao Paulo'
    },
    {
      where: {
        name: 'Sao Paulo'
      }
    }
  )

  const result = await State.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Sao Paulo')
})

test('delete state', async () => {
  await State.create({
    name: 'Sao Paulo',
    initial: 'SP'
  })

  await State.destroy({
    where: {
      name: 'Sao Paulo'
    }
  })

  const result = await State.findOne({
    where: {
      name: 'Sao Paulo'
    }
  })
  expect(result).toBeNull()
})
