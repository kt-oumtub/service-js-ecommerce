module.exports = (sequelize, DataTypes) => {
  const t_cart = sequelize.define(
    't_cart',
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inventory_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_quantity: {
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
      tableName: 't_cart',
      schema: 'ecommerce',
    }
  )

  return t_cart
}
