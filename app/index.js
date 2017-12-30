import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import compress from 'koa-compress'
import path from 'path'

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config')

// Create Koa Application
const app = new Koa()
const config = require('config')
const port = config.get('http.port')
const sequelize = require('./services/connection').default
const router = require('./router').default

app
  .use(koaLogger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())
  .use(
    compress({
      flush: require('zlib').Z_SYNC_FLUSH
    })
  )
  .use(router.routes())

// models.sequelize.drop()

// Start the application
sequelize.sync().then(() => {
  console.log('✅  Database connected')
  app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
})

export default app
