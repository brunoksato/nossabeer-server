import Boot from '../../services/env'

Boot()
const models = require('../index')
const ProductQuestion = models.ProductQuestion

beforeEach(async () => {
  await ProductQuestion.sync({ force: true })
})

test('product_question model exist', async () => {
  expect(ProductQuestion).toBeDefined()
})

test('list product_question', async () => {
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })
  const result = await ProductQuestion.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get product_question', async () => {
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })
  const result = await ProductQuestion.findOne({
    where: {
      question: 'Question'
    }
  })
  expect(result).toBeDefined()
  expect(result.question).toEqual('Question')
})

test('create product_question', async () => {
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })
})

test('update product_question', async () => {
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })

  await ProductQuestion.update(
    {
      question: 'Question'
    },
    {
      where: {
        question: 'Question'
      }
    }
  )

  const result = await ProductQuestion.findOne({
    where: {
      question: 'Question'
    }
  })
  expect(result).toBeDefined()
  expect(result.question).toEqual('Question')
})

test('delete product_question', async () => {
  await ProductQuestion.create({
    question: 'Question',
    answer: 'Answer',
    status: 'pending'
  })

  await ProductQuestion.destroy({
    where: {
      question: 'Question'
    }
  })

  const result = await ProductQuestion.findOne({
    where: {
      question: 'Question'
    }
  })
  expect(result).toBeNull()
})
