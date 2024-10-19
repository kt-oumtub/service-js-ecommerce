const { m_product, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.inquiryProduct = async ({ condition, bind, pagination }) => {
  try {
    let query = `
    select *
    from ecommerce.m_product 
    where 1 = 1
    ${condition}
    ${pagination}
    `

    let queryCount = `
    select count(*)
    from ecommerce.m_product 
    where 1 = 1
    ${condition}
    `

    const result = await sequelize.query(query, { bind, type: QueryTypes.SELECT })
    const total = await sequelize.query(queryCount, { bind, type: QueryTypes.SELECT })

    return { result, total }
  } catch (error) {
    throw error
  }
}

module.exports.getProductById = async ({ product_id }) => {
  try {
    let query = `
    select *
    from ecommerce.m_product 
    where product_id = $product_id
    `

    const result = await sequelize.query(query, { bind: { product_id }, type: QueryTypes.SELECT, plain: true })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.bulkCreateMProduct = async (body, transaction) => {
  try {
    let result = await m_product.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createMProduct = async (body, transaction) => {
  try {
    let result = await m_product.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateMProduct = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await m_product.update(updateSet, {
      where: updateWhere,
      returning: true,
      transaction,
    })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.findOneMProduct = async (attributes) => {
  try {
    let result = await m_product.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
