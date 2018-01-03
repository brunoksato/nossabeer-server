import Boom from 'boom'
import { Seller } from '../models'

class SellersControllers {
  async list (ctx) {
    try {
      ctx.body = await Seller.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await Seller.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body

    try {
      payload.user_id = ctx.userCtx.get('id')
      await Seller.create(payload)
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
      await Seller.update(payload, {
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

  async delete (ctx) {
    try {
      await Seller.destroy({
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

export default new SellersControllers()
