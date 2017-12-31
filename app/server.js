import app from './index'
import sequelize from './services/connection'

const config = require('config')
const port = config.get('http.port')

// Start the application
sequelize.sync().then(() => {
  console.log('✅  Database connected')
  app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
})
