import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'messages'
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
export class Message extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    this.belongsTo(models.Seller, {
      foreignKey: 'seller_id'
    })
  }
}
