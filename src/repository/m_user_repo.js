const { m_user, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.getValidUserWithPassword = async ({ bind }) => {
  try {
    let query = `
    select username ,password
    from m_user
    where 1 = 1
    and username = $username
    `

    const result = await sequelize.query(query, { bind, type: QueryTypes.SELECT, plain: true })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.getValidUser = async ({ bind }) => {
  try {
    let query = `
    select user_id, username, email, is_logged_in,
    user_fname_th, user_fname_en, user_lname_th, user_lname_en, record_status, created_by, updated_by
    from m_user
    where 1 = 1
    and record_status = 'A'
    `

    const result = await sequelize.query(query, { bind, type: QueryTypes.SELECT, plain: true })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.bulkCreateMUser = async (body, transaction) => {
  try {
    let result = await m_user.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createMUser = async (body, transaction) => {
  try {
    let result = await m_user.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateMUser = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await m_user.update(updateSet, {
      where: updateWhere,
      returning: true,
      transaction,
    })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.destroyMUser = async (transaction) => {
  try {
    await m_user.destroy({ where: {}, transaction })
    return
  } catch (error) {
    throw error
  }
}

module.exports.findOneMUser = async (attributes) => {
  try {
    let result = await m_user.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
