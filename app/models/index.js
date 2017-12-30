import fs from 'fs'
import path from 'path'
import db from '../services/connection'

// Load each model file
Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .map(function (file) {
      require(path.join(__dirname, file))
      return {}
    })
)

// Load model associations
for (const model of Object.keys(db.models)) {
  typeof db.models[model].associate === 'function' && db.models[model].associate(db.models)
}

const { User, Address } = db.models
export { User, Address }
