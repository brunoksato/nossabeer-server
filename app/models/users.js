import moment from 'moment'
import Boom from 'boom'
import jwt from '../services/jwt'
import scrypt from '../services/bscrypt'
import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'users'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM(['male', 'female']),
    allowNull: true
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: true
  }
})
export class User extends Model {
  static associate (models) {
    this.hasOne(models.Address)
    this.hasMany(models.Product)
    this.hasMany(models.Notification)
    this.hasMany(models.Message)
    this.belongsToMany(models.Product, {
      through: 'user_product_favorites',
      foreignKey: 'product_id'
    })
    this.belongsToMany(models.Seller, {
      through: 'user_seller_follows',
      foreignKey: 'seller_id'
    })
  }

  toJSON () {
    const values = Object.assign({}, this.get())

    delete values.created_at
    delete values.updated_at
    delete values.deleted_at
    delete values.password
    return values
  }

  static resetPassword (password) {
    this.password = password
    this.forget_password.token = null
    this.forget_password.updated_at = moment().format()
    return this.save()
  }

  static parseToken (token, options) {
    return new Promise((resolve, reject) => {
      let obj = null
      try {
        obj = jwt.verify(token.trim(), options)
      } catch (err) {
        return reject(Boom.unauthorized('Invalid or expired token'))
      }

      if (!obj) {
        return reject(Boom.unauthorized('Invalid or expired token'))
      }
      User.find({ where: { id: obj.user } }).then((user, err) => {
        if (err) {
          return reject(Boom.unauthorized('Invalid user'))
        }
        resolve(user)
      })
    })
  }

  static verifyPassword (hash, password) {
    return new Promise((resolve, reject) => {
      scrypt.verify(hash, password, (err, equal) => {
        if (err) {
          return reject(err)
        }

        resolve(!!equal)
      })
    })
  }

  static genToken (id, options) {
    return jwt.sign(
      {
        user: id
      },
      options
    )
  }

  static encryptPassword (password) {
    return new Promise((resolve, reject) => {
      scrypt.hash(password, (err, hash) => {
        if (err) {
          return reject(err)
        }

        resolve(hash)
      })
    })
  }
}
