import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'product_reviews'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  vote: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(['pending', 'approved', 'refused']),
    allowNull: false,
    defaltValue: 'pending'
  }
})
export class ProductReview extends Model {
  static associate (models) {
    this.belongsTo(models.Product, {
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
}
