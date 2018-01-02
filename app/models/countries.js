import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'countries'
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
  initial: {
    type: DataTypes.STRING(5),
    allowNull: false
  }
})
export class Country extends Model {
  static associate (models) {
    this.hasMany(models.State)
  }

  toJSON () {
    const values = Object.assign({}, this.get())

    delete values.created_at
    delete values.updated_at
    delete values.deleted_at
    return values
  }
}
