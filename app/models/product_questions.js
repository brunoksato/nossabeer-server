import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'product_questions'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  question: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(['pending', 'approved', 'refused']),
    allowNull: false,
    defaltValue: 'pending'
  }
})
export class ProductQuestion extends Model {
  static associate (models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id'
    })
  }
}
