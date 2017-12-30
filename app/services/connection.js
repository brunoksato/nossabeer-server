import Sequelize from 'sequelize'
import config from 'config'

const sequelize = new Sequelize(config.get('PG_URI'), {
  define: {
    timestamps: true,
    underscored: true,
    paranoid: true
  },
  logging: false,
  operatorsAliases: Sequelize.Op,
  dialect: config.get('dialect')
})

export default sequelize
