import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'sellers'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cnpj: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(['company', 'freelance']),
    allowNull: false
  },
  facebook: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
})
export class Seller extends Model {
  static associate (models) {
    this.hasMany(models.City)
    this.hasMany(models.Message)
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    this.belongsToMany(models.User, {
      through: 'user_seller_follows',
      foreignKey: 'user_id'
    })
  }

  toJSON () {
    const values = Object.assign({}, this.get())

    delete values.created_at
    delete values.updated_at
    delete values.deleted_at
    return values
  }
}
