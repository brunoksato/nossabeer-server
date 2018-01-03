import { Model, DataTypes } from 'sequelize'
import { Options, Attributes } from 'sequelize-decorators'
import sequelize from '../services/connection'

@Options({
  sequelize,
  tableName: 'place_times'
})
@Attributes({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  monday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  monday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  monday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tuesday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tuesday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tuesday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  wednesday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  wednesday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  wednesday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  thursday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  thursday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  thursday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  friday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  friday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  friday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  saturday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  saturday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  saturday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sunday_start: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  sunday_end: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  sunday_open: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})
export class PlaceTime extends Model {
  static associate (models) {
    this.belongsTo(models.Place, {
      foreignKey: 'place_id'
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
