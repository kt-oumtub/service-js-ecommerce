module.exports = (sequelize, DataTypes) => {
  const m_inventory = sequelize.define(
    'm_inventory',
    {
      inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      inventory_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      inventory_name_th: {
        type: DataTypes.STRING(100),
      },
      inventory_name_en: {
        type: DataTypes.STRING(100),
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
      tableName: 'm_inventory',
      schema: 'ecommerce',
    }
  )

  return m_inventory
}
