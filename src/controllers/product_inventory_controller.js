const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')
const { fn, Op } = require('sequelize')
const sequelize = require('../config/database')

const tProductInventoryRepo = require('../repository/t_product_inventory_repo.js')
const mInventoryRepo = require('../repository/m_inventory_repo.js')

module.exports.maintainProductInventory = async (req, res) => {
  try {
    let { inventory_code, products, created_by = 'Admin' } = req.body
    const updated_by = created_by

    const findExist = await mInventoryRepo.findOneMInventory({ inventory_code })
    if (!findExist) throw httpStatus.REQ_DOES_EXIT

    await sequelize.transaction(async (transaction) => {
      if (Array.isArray(products)) {
        let newProductInventory = []
        for (const val of products) {
          let { product_inventory_id, record_status = 'A' } = val
          let obj = { inventory_code, ...val, record_status, created_by, updated_by }
          if (!product_inventory_id) {
            newProductInventory.push(obj)
          } else {
            let updateSet = obj
            let updateWhere = { product_inventory_id }
            await tProductInventoryRepo.updateTProductInventory({ updateSet, updateWhere }, transaction)
          }
        }
        await tProductInventoryRepo.bulkCreateTProductInventory(newProductInventory, transaction)
      }
    })

    let result = { inventory_code, product: products ?? [] }

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.deleteProductInventory = async (req, res) => {
  try {
    let { inventory_code, updated_by = 'Admin' } = req.body

    let updateSet = { record_status: 'D', updated_by }
    let updateWhere = { inventory_code }
    await tProductInventoryRepo.updateTProductInventory({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
