import Boom from 'boom'
import { State } from '../models'

class StateControlllers {
  async list (ctx) {
    try {
      ctx.body = await State.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await State.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body
    try {
      payload.country.id = ctx.countryCtx.get('id')
      await StateControlllers.create(payload)
      ctx.body = {
        succsess: true
      }
      ctx.status = 201
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async update (ctx) {
    let payload = ctx.request.body

    try {
      await State.update(payload, {
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
      await StateControlllers.destroy({
        where: {
          id: ctx.params.id
        }
      })
      ctx.body = {
        success: true
      }
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }
}

export default new StateControlllers()
