import Boot from '../../services/env'

Boot()
const models = require('../index')
const Place = models.Place

beforeEach(async () => {
  await Place.sync({ force: true })
})

test('place model exist', async () => {
  expect(Place).toBeDefined()
})

test('list place', async () => {
  await Place.create({
    name: 'Place',
    description: 'Place description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })
  await Place.create({
    name: 'Place 2',
    description: 'Place 2 description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })
  const result = await Place.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get place', async () => {
  await Place.create({
    name: 'Place',
    description: 'Place description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })
  await Place.create({
    name: 'Place 2',
    description: 'Place 2 description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })
  const result = await Place.findOne({
    where: {
      name: 'Place'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Place')
})

test('create place', async () => {
  await Place.create({
    name: 'Place',
    description: 'Place description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })
})

test('update place', async () => {
  await Place.create({
    name: 'Place',
    description: 'Place description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })

  await Place.update(
    {
      name: 'Place'
    },
    {
      where: {
        name: 'Place'
      }
    }
  )

  const result = await Place.findOne({
    where: {
      name: 'Place'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Place')
})

test('delete place', async () => {
  await Place.create({
    name: 'Place',
    description: 'Place description',
    image: '101010.jpg',
    facebook: 'https://facebook.com/place',
    avg_price: 4,
    active: true
  })

  await Place.destroy({
    where: {
      name: 'Place'
    }
  })

  const result = await Place.findOne({
    where: {
      name: 'Place'
    }
  })
  expect(result).toBeNull()
})
