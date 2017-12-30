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
    this.hasMany(models.Address)
  }

  resetPassword (password) {
    this.password = password
    this.forget_password.token = null
    this.forget_password.updated_at = moment().format()
    return this.save()
  }

  parseToken (token, options) {
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
        resolve([user, obj])
      })
    })
  }

  verifyPassword (hash, password) {
    return new Promise((resolve, reject) => {
      scrypt.verify(hash, password, (err, equal) => {
        if (err) {
          return reject(err)
        }

        resolve(!!equal)
      })
    })
  }

  genToken (id, options) {
    return jwt.sign(
      {
        user: id
      },
      options
    )
  }

  encryptPassword (password) {
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
