import Boot from '../../services/env'

Boot()
const models = require('../index')
const ProductReview = models.ProductReview

beforeEach(async () => {
  await ProductReview.sync({ force: true })
})

test('product_review model exist', async () => {
  expect(ProductReview).toBeDefined()
})

test('list product_review', async () => {
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  await ProductReview.create({
    vote: 5,
    title: 'Review 2',
    description: 'Review 2 description',
    status: 'pending'
  })
  const result = await ProductReview.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get product_review', async () => {
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  const result = await ProductReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('Review')
})

test('create product_review', async () => {
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
})

test('update product_review', async () => {
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })

  await ProductReview.update(
    {
      title: 'Review'
    },
    {
      where: {
        title: 'Review'
      }
    }
  )

  const result = await ProductReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('Review')
})

test('delete product_review', async () => {
  await ProductReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })

  await ProductReview.destroy({
    where: {
      title: 'Review'
    }
  })

  const result = await ProductReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeNull()
})
