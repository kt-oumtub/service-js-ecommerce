module.exports = (sequelize, DataTypes) => {
  const t_product_inventory = sequelize.define(
    't_product_inventory',
    {
      product_inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // product_inventory_code: {
      //   type: DataTypes.STRING(20),
      //   allowNull: false,
      // },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      inventory_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      record_status: {
        type: DataTypes.STRING(1),
      },
      created_by: {
        type: DataTypes.STRING(20),
      },
      updated_by: {
        type: DataTypes.STRING(20),
      },
    },
    {
      freezeTableName: false,
      createdAt: 'created_dt',
      updatedAt: 'updated_dt',
      timestamps: true,
      tableName: 't_product_inventory',
      schema: 'ecommerce',
    }
  )

  return t_product_inventory
}
