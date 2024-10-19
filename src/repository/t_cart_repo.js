const { t_cart, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.getCartDetailByUserId = async ({ user_id }) => {
  try {
    let query = `
   select a.* ,
    b.product_name_th ,b.product_name_en ,b.price ,
    cast(a.product_quantity * b.price as numeric) as total_product_price
    from ecommerce.t_cart a
    left join ecommerce.m_product b on a.product_code = b.product_code
    where 1 = 1
    and a.user_id = $user_id
    order by a.product_code
    `

    const result = await sequelize.query(query, { bind: { user_id }, type: QueryTypes.SELECT })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.bulkCreateTCart = async (body, transaction) => {
  try {
    let result = await t_cart.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createTCart = async (body, transaction) => {
  try {
    let result = await t_cart.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateTCart = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await t_cart.update(updateSet, {
      where: updateWhere,
      returning: true,
      plain: true,
      transaction,
    })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.findOneTCart = async (attributes) => {
  try {
    let result = await t_cart.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
