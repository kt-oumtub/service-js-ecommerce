module.exports = (sequelize, DataTypes) => {
  const m_product = sequelize.define(
    'm_product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_name_th: {
        type: DataTypes.STRING(100),
      },
      product_name_en: {
        type: DataTypes.STRING(100),
      },
      product_detail: {
        type: DataTypes.STRING(500),
      },
      price: {
        type: DataTypes.NUMERIC
      },
      brand: {
        type: DataTypes.STRING(50),
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
      tableName: 'm_product',
      schema: 'ecommerce',
    }
  )

  return m_product
}
