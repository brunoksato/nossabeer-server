import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'places'
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
  description: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  facebook: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  avg_price: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})
export class Place extends Model {
  static associate (models) {
    this.hasMany(models.PlaceTime)
    this.hasMany(models.PlaceReview)
    this.belongsTo(models.Address, {
      foreignKey: 'address_id'
    })
    this.belongsToMany(models.Product, {
      through: 'place_products',
      foreignKey: 'product_id'
    })
  }

  toJSON () {
    const values = Object.assign({}, this.get())

    delete values.created_at
    delete values.updated_at
    delete values.deleted_at
    return values
  }

  static defaultScope () {
    return {
      where: {
        active: true
      }
    }
  }
}
