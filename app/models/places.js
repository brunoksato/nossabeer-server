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
    this.belongsTo(models.Address, {
      foreignKey: 'address_id'
    })
  }

  static defaultScope () {
    return {
      where: {
        active: true
      }
    }
  }
}
