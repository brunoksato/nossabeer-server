import Boom from 'boom'
import { Place } from './models'

class PlacesControllers {
  async list (ctx) {
    try {
      ctx.body = await Place.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await Place.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body

    try {
      await Place.create(payload)
      ctx.body = {
        success: true
      }
      ctx.status = 201
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async update (ctx) {
    let payload = ctx.request.body

    try {
      await Place.update(payload, {
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
      await Place.destroy({
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

export default new PlacesControllers()
