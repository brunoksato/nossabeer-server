import Boom from 'boom'
import { ProductReview } from '../models'

class ProductsReviewsControllers {
  async list (ctx) {
    try {
      ctx.body = await ProductReview.findAll({})
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async get (ctx) {
    try {
      ctx.body = await ProductReview.findById(ctx.params.id)
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }

  async create (ctx) {
    let payload = ctx.request.body

    try {
      payload.user.id = ctx.userCtx.get('id')
      await ProductReview.create(payload)
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
      await ProductReview.update(payload, {
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
      await ProductReview.destroy({
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

export default new ProductsReviewsControllers()
