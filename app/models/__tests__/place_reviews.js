import Boot from '../../services/env'

Boot()
const models = require('../index')
const PlaceReview = models.PlaceReview

beforeEach(async () => {
  await PlaceReview.sync({ force: true })
})

test('place_review model exist', async () => {
  expect(PlaceReview).toBeDefined()
})

test('list place_review', async () => {
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  await PlaceReview.create({
    vote: 5,
    title: 'Review 2',
    description: 'Review 2 description',
    status: 'pending'
  })
  const result = await PlaceReview.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get place_review', async () => {
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
  const result = await PlaceReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('Review')
})

test('create place_review', async () => {
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })
})

test('update place_review', async () => {
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })

  await PlaceReview.update(
    {
      title: 'Review'
    },
    {
      where: {
        title: 'Review'
      }
    }
  )

  const result = await PlaceReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeDefined()
  expect(result.title).toEqual('Review')
})

test('delete place_review', async () => {
  await PlaceReview.create({
    vote: 5,
    title: 'Review',
    description: 'Review description',
    status: 'pending'
  })

  await PlaceReview.destroy({
    where: {
      title: 'Review'
    }
  })

  const result = await PlaceReview.findOne({
    where: {
      title: 'Review'
    }
  })
  expect(result).toBeNull()
})
