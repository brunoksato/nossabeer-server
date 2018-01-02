import Boom from 'boom'
import moment from 'moment'
import services from '../services/helpers'
import { User } from '../models'

class UsersControllers {
  async signin (ctx) {
    const payload = ctx.request.body

    try {
      const user = await User.findOne({
        where: { email: payload.email }
      })

      if (!user) {
        ctx.body = services.Boom.Joi({
          message: 'User not found',
          key: 'login'
        })
        ctx.throw(400)
      }

      const isCorrect = await User.verifyPassword(user.password, payload.password)
      if (!isCorrect) {
        ctx.body = services.Boom.Joi({
          message: 'Wrong authentication credentials',
          key: 'password'
        })
        ctx.throw(400)
      }

      const token = User.genToken(user.id, {
        expiresIn: 525949
      })

      ctx.body = {
        token: token,
        expires: moment()
          .add(1, 'year')
          .toDate(),
        user: user
      }
      ctx.status = 200
    } catch (err) {
      ctx.body = Boom.badRequest(err)
      ctx.throw(400)
    }
  }

  async signup (ctx) {
    let payload = ctx.request.body

    try {
      payload.password = await User.encryptPassword(payload.password)
      await User.create(payload)
      ctx.body = {
        success: true
      }
      ctx.status = 201
    } catch (err) {
      ctx.body = Boom.badRequest(err)
    }
  }
}

export default new UsersControllers()
