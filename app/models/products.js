import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'products'
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
  volume: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  flavor: {
    type: DataTypes.ARRAY(DataTypes.STRING(255)),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  family: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  temperature: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  abv: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ibu: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  view: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})
export class Product extends Model {
  static associate (models) {
    this.hasMany(models.ProductReview)
    this.hasMany(models.ProductQuestion)
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    this.belongsToMany(models.Place, {
      through: 'place_products',
      foreignKey: 'place_id'
    })
    this.belongsToMany(models.User, {
      through: 'user_product_favorites',
      foreignKey: 'user_id'
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
