import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'addresses'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  street: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipcode: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  complement: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  location: {
    type: DataTypes.GEOMETRY,
    defaultValue: null
  },
  location_text: {
    type: DataTypes.STRING(400),
    defaultValue: null
  }
})
export class Address extends Model {
  static associate (models) {
    this.hasMany(models.Place)
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  }
}
