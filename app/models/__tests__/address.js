import Boot from '../../services/env'

Boot()
const models = require('../index')
const Address = models.Address

beforeEach(async () => {
  await Address.sync({ force: true })
})

test('address model exist', async () => {
  expect(Address).toBeDefined()
})

test('list address', async () => {
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })
  const result = await Address.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get address', async () => {
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })
  const result = await Address.findOne({
    where: {
      street: 'Av Paulista'
    }
  })
  expect(result).toBeDefined()
  expect(result.street).toEqual('Av Paulista')
})

test('create address', async () => {
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })
})

test('update address', async () => {
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })

  await Address.update(
    {
      street: 'Av Paulista 1'
    },
    {
      where: {
        street: 'Av Paulista'
      }
    }
  )

  const result = await Address.findOne({
    where: {
      street: 'Av Paulista 1'
    }
  })
  expect(result).toBeDefined()
  expect(result.street).toEqual('Av Paulista 1')
})

test('delete address', async () => {
  await Address.create({
    street: 'Av Paulista',
    number: 1000,
    district: 'Sao Paulo',
    zipcode: '00000-000',
    complement: 'house'
  })

  await Address.destroy({
    where: {
      street: 'Av Paulista'
    }
  })

  const result = await Address.findOne({
    where: {
      street: 'Av Paulista'
    }
  })
  expect(result).toBeNull()
})
