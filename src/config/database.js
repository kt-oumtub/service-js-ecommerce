const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize')

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

    //! for sample data
    const insertMProduct = `
    INSERT INTO ecommerce.m_product
    (product_code, product_name_th, product_name_en, product_detail, price, brand, record_status, created_by, updated_by, created_dt, updated_dt)
    VALUES
    ('PEPSI001', 'เป๊ปซี่ ดำ', 'Pepsi Original', NULL, 10, 'Pepsi', 'A', 'Admin', 'Admin', now(), now()),
    ('PEPSI002', 'เป๊ปซี่ แดง', 'Pepsi Red', NULL, 15, 'Pepsi', 'A', 'Admin', 'Admin', now(), now()),
    ('PEPSI003', 'เป๊ปซี่ เขียว', 'Pepsi Green', NULL, 15, 'Pepsi', 'A', 'Admin', 'Admin', now(), now()),
    ('PEPSI004', 'เป๊ปซี่ ฟ้า', 'Pepsi Blue', NULL, 10, 'Pepsi', 'A', 'Admin', 'Admin', now(), now()),
    ('MAMA001', 'มาม่า หมูสับ', 'Mama Pork', NULL, 5, 'Mama', 'A', 'Admin', 'Admin', now(), now()),
    ('MAMA002', 'มาม่า ต้มยำ', 'Mama Tom Yum', NULL, 5, 'Mama', 'A', 'Admin', 'Admin', now(), now());
    `
    const insertMInventory = `
    INSERT INTO ecommerce.m_inventory
    (inventory_code, inventory_name_th, inventory_name_en, record_status, created_by, updated_by, created_dt, updated_dt)
    VALUES
    ('INV001', 'คลัง 1', 'Inventory 1', 'A', 'Admin', 'Admin', now(), now()),
    ('INV002', 'คลัง 2', 'Inventory 2', 'A', 'Admin', 'Admin', now(), now());
    `

    let option = {
      alter: true,
      // force: true,
    }
    //! open for sync db
    await sequelize.sync(option)

    //todo for add sample data
    // if (option?.force) await sequelize.query(insertMProduct, { type: QueryTypes.INSERT }), await sequelize.query(insertMInventory, { type: QueryTypes.INSERT })

    console.log('DB Sync done...')
  } catch (err) {
    console.error('Error syncing database:', err)
  }
})()

module.exports = sequelize
