import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'cities'
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
  }
})
export class City extends Model {
  static associate (models) {
    this.hasMany(models.Address)
    this.belongsTo(models.State, {
      foreignKey: 'state_id'
    })
  }
}
