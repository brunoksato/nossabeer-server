import fs from 'fs'
import path from 'path'
import db from '../services/connection'

// Load each model file
Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(
      file =>
        file.indexOf('.') !== 0 &&
        file !== 'index.js' &&
        file !== '__tests__' &&
        file !== '__tests_'
    )
    .map(function (file) {
      require(path.join(__dirname, file))
      // const modelName = Object.keys(model)[0]
      return {
        // [modelName]: model[modelName]
      }
    })
)

// if (db.models)
//   db.models = db

// Load model associations
for (const model of Object.keys(db.models)) {
  typeof db.models[model].associate === 'function' && db.models[model].associate(db.models)
}

const {
  User,
  Address,
  City,
  Country,
  Message,
  Notification,
  PlaceReview,
  PlaceTime,
  Place,
  ProductQuestion,
  ProductReview,
  Product,
  Seller,
  State
} = db.models
export {
  User,
  Address,
  City,
  Country,
  Message,
  Notification,
  PlaceReview,
  PlaceTime,
  Place,
  ProductQuestion,
  ProductReview,
  Product,
  Seller,
  State
}
