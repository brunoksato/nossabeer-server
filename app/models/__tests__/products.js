import Boot from '../../services/env'

Boot()
const models = require('../index')
const Product = models.Product

beforeEach(async () => {
  await Product.sync({ force: true })
})

test('product model exist', async () => {
  expect(Product).toBeDefined()
})

test('list product', async () => {
  await Product.create({
    name: 'Produto 1',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })
  await Product.create({
    name: 'Produto 2',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })
  const result = await Product.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get seller', async () => {
  await Product.create({
    name: 'Produto 1',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })
  await Product.create({
    name: 'Produto 2',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })
  const result = await Product.findOne({
    where: {
      name: 'Produto 1'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Produto 1')
})

test('create product', async () => {
  await Product.create({
    name: 'Produto 1',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })
})

test('update product', async () => {
  await Product.create({
    name: 'Produto 1',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })

  await Product.update(
    {
      name: 'Produto 1'
    },
    {
      where: {
        name: 'Produto 1'
      }
    }
  )

  const result = await Product.findOne({
    where: {
      name: 'Produto 1'
    }
  })
  expect(result).toBeDefined()
  expect(result.name).toEqual('Produto 1')
})

test('delete product', async () => {
  await Product.create({
    name: 'Produto 1',
    description: 'My product is nice',
    volume: '250ml',
    type: 'APA',
    flavor: ['Amarga', 'Doce'],
    color: 'Golden',
    family: 'APA',
    temperature: '5',
    abv: '2',
    ibu: '5',
    country: 'brasil',
    price: 10,
    quantity: 0,
    view: 0
  })

  await Product.destroy({
    where: {
      name: 'Produto 1'
    }
  })

  const result = await Product.findOne({
    where: {
      name: 'Produto 1'
    }
  })
  expect(result).toBeNull()
})
