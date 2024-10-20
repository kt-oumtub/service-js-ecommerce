const { t_order, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.getOrderHistory = async ({ condition, bind }) => {
  try {
    let query = `
    select a.* ,
    b.product_name_th ,b.product_name_en ,
    case when a.record_status = 'A' then 'SUCCESS' else 'CANCELED' end as ordered_status
    from ecommerce.t_order a
    left join ecommerce.m_product b on a.product_code = b.product_code 
    where 1 = 1
    ${condition}
    and a.record_status != 'D'
    order by a.order_date ,a.created_dt 
    `

    const result = await sequelize.query(query, { bind, type: QueryTypes.SELECT })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.bulkCreateTOrder = async (body, transaction) => {
  try {
    let result = await t_order.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createTOrder = async (body, transaction) => {
  try {
    let result = await t_order.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateTOrder = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await t_order.update(updateSet, {
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

module.exports.findOneTOrder = async (attributes) => {
  try {
    let result = await t_order.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
