import Boot from '../../services/env'

Boot()
const models = require('../index')
const Seller = models.Seller

beforeEach(async () => {
  await Seller.sync({ force: true })
})

test('seller model exist', async () => {
  expect(Seller).toBeDefined()
})

test('list seller', async () => {
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })
  const result = await Seller.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get seller', async () => {
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })
  const result = await Seller.findOne({
    where: {
      cnpj: '04536288000174'
    }
  })
  expect(result).toBeDefined()
  expect(result.cnpj).toEqual('04536288000174')
})

test('create seller', async () => {
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })
})

test('update seller', async () => {
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })

  await Seller.update(
    {
      cnpj: '04536288000174'
    },
    {
      where: {
        cnpj: '04536288000174'
      }
    }
  )

  const result = await Seller.findOne({
    where: {
      cnpj: '04536288000174'
    }
  })
  expect(result).toBeDefined()
  expect(result.cnpj).toEqual('04536288000174')
})

test('delete seller', async () => {
  await Seller.create({
    cnpj: '04536288000174',
    type: 'freelance',
    facebook: 'https://facebook.com/nossabeer'
  })

  await Seller.destroy({
    where: {
      cnpj: '04536288000174'
    }
  })

  const result = await Seller.findOne({
    where: {
      cnpj: '04536288000174'
    }
  })
  expect(result).toBeNull()
})
