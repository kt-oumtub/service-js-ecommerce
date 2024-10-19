const { t_product_inventory, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.bulkCreateTProductInventory = async (body, transaction) => {
  try {
    let result = await t_product_inventory.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createTProductInventory = async (body, transaction) => {
  try {
    let result = await t_product_inventory.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateTProductInventory = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await t_product_inventory.update(updateSet, {
      where: updateWhere,
      returning: true,
      transaction,
    })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.findOneTProductInventory = async (attributes) => {
  try {
    let result = await t_product_inventory.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
