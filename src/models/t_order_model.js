module.exports = (sequelize, DataTypes) => {
  const t_order = sequelize.define(
    't_order',
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.INTEGER,
      },
      inventory_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.NUMERIC,
      },
      total_price: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
      tableName: 't_order',
      schema: 'ecommerce',
    }
  )

  return t_order
}
