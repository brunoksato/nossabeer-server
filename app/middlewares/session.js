import Boom from 'boom'
import { User } from '../models'

export default async function session (ctx, next) {
  if (ctx.url.match(/^\/api/)) {
    let authorization = ctx.headers.authorization

    if (!authorization) {
      ctx.body = Boom.unauthorized('Missing authorization headers')
      ctx.status = 401
    } else {
      authorization = authorization.replace(/bearer/gi, '')
    }

    try {
      ctx.userCtx = await User.parseToken(authorization)
      await next()
    } catch (error) {
      ctx.body = error
      ctx.status = 401
    }
  } else {
    await next()
  }
}
