const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT || 5432,
  logging: false,
  pool: {
    max: 20,
    acquire: 30000,
    idle: 10000,
  },
})

// Sync the database and create schema
;(async () => {
  try {
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS ecommerce')

    //! open for sync db
    await sequelize.sync({
      alter: true,
      // force: true,
    })
    console.log('DB Sync done...')
  } catch (err) {
    console.error('Error syncing database:', err)
  }
})()

module.exports = sequelize
