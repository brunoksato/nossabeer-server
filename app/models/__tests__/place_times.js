import Boot from '../../services/env'

Boot()
const models = require('../index')
const PlaceTime = models.PlaceTime

beforeEach(async () => {
  await PlaceTime.sync({ force: true })
})

test('place_time model exist', async () => {
  expect(PlaceTime).toBeDefined()
})

test('list place_time', async () => {
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })
  const result = await PlaceTime.findAll()
  expect(result).toBeDefined()
  expect(result).toHaveLength(2)
})

test('get place_time', async () => {
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })
  const result = await PlaceTime.findOne({
    where: {
      sunday_open: true
    }
  })
  expect(result).toBeDefined()
  expect(result.sunday_open).toEqual(true)
})

test('create place_time', async () => {
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })
})

test('update place_time', async () => {
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })

  await PlaceTime.update(
    {
      sunday_open: true
    },
    {
      where: {
        sunday_open: true
      }
    }
  )

  const result = await PlaceTime.findOne({
    where: {
      sunday_open: true
    }
  })
  expect(result).toBeDefined()
  expect(result.sunday_open).toEqual(true)
})

test('delete place_time', async () => {
  await PlaceTime.create({
    monday_start: 'Dia start',
    monday_end: 'Dia end',
    monday_open: true,
    tuesday_start: 'Dia start',
    tuesday_end: 'Dia end',
    tuesday_open: true,
    wednesday_start: 'Dia start',
    wednesday_end: 'Dia end',
    wednesday_open: true,
    thursday_start: 'Dia start',
    thursday_end: 'Dia end',
    thursday_open: true,
    friday_start: 'Dia start',
    friday_end: 'Dia end',
    friday_open: true,
    saturday_start: 'Dia start',
    saturday_end: 'Dia end',
    saturday_open: true,
    sunday_start: 'Dia start',
    sunday_end: 'Dia end',
    sunday_open: true
  })

  await PlaceTime.destroy({
    where: {
      sunday_open: true
    }
  })

  const result = await PlaceTime.findOne({
    where: {
      sunday_open: true
    }
  })
  expect(result).toBeNull()
})
