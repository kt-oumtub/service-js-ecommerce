module.exports = (sequelize, DataTypes) => {
  const m_user = sequelize.define(
    'm_user',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
      },
      user_fname_th: {
        type: DataTypes.STRING(100),
      },
      user_fname_en: {
        type: DataTypes.STRING(100),
      },
      user_lname_th: {
        type: DataTypes.STRING(100),
      },
      user_lname_en: {
        type: DataTypes.STRING(100),
      },
      is_logged_in: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      freezeTableName: true,
      createdAt: 'created_dt',
      updatedAt: 'updated_dt',
      timestamps: true,
      tableName: 'm_user',
    }
  )

  return m_user
}
