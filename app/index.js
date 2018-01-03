import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import compress from 'koa-compress'
import Boot from './services/env'

Boot()

// Create Koa Application
const app = new Koa()
const session = require('./middlewares/session').default
const router = require('./router').default

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger())
}
app.use(bodyParser())
app.use(helmet())
app.use(cors())
app.use(
  compress({
    flush: require('zlib').Z_SYNC_FLUSH
  })
)
app.use(session)
app.use(router.routes())
app.use(router.allowedMethods())

export default app
