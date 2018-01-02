import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'notifications'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})
export class Notification extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
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
