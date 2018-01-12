import Boom from 'boom'
import { Product } from '../models'

class ProductsControllers {
  async list (ctx) {
    try {
      ctx.body = await Product.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await Product.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body

    try {
      payload.user_id = ctx.userCtx.get('id')
      await Product.create(payload)
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
      await Product.update(payload, {
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
      await Product.destroy({
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

export default new ProductsControllers()
