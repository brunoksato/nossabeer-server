import Boom, { badRequest } from 'boom'
import { Country } from '../models'

class CountriesControllers {
  async list (ctx) {
    try {
      ctx.body = Country.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await Country.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body
    try {
      await Country.create(payload)
      ctx.body = {
        success: true
      }
      ctx.status = 201
    } catch (err) {
      ctx.body = badRequest(err)
    }
  }

  async update (ctx) {
    let payload = ctx.request.body
    try {
      await Country.update(payload, {
        id: ctx.params.id
      })
      ctx.body = {
        success: true
      }
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async delete (ctx) {
    try {
      await Country.destroy({
        id: ctx.params.id
      })
      ctx.body = {
        success: true
      }
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }
}

export default new CountriesControllers()
