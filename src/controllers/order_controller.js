const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')

const tCartRepo = require('../repository/t_cart_repo.js')
const tOrderRepo = require('../repository/t_order_repo.js')
const tProductInventoryRepo = require('../repository/t_product_inventory_repo.js')

const sequelize = require('../config/database')

module.exports.getOrderHistoryByUserId = async (req, res) => {
  try {
    let { user_id } = req.params

    let condition = `and a.user_id = $user_id\n`
    let bind = { user_id }

    const result = await tOrderRepo.getOrderHistory({ condition, bind })

    res.send(setStatusSuccess(httpStatus.SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.createOrder = async (req, res) => {
  try {
    let { cart_id, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    const conditionCart = `and a.cart_id = $cart_id`
    const bindCart = { cart_id }
    const findCart = await tCartRepo.getCartDetailForOrdered({ condition: conditionCart, bind: bindCart })
    if (!findCart) throw httpStatus.REQ_DOES_EXIT

    let result = await sequelize.transaction(async (transaction) => {
      //* get old data for cal product amount
      let getProductInventory = await tProductInventoryRepo.findOneTProductInventory({
        inventory_code: findCart.inventory_code,
        product_code: findCart.product_code,
        record_status: 'A',
      })
      let new_product_amount = getProductInventory.product_amount - (findCart.total_amount ?? 0)
      if (new_product_amount < 0) throw httpStatus.UNABLE_PROCESS //! product remaining not match with cart,order

      // //* update data of product and inventory
      let updateSet = { product_amount: new_product_amount }
      let updateWhere = { inventory_code: findCart.inventory_code, product_code: findCart.product_code }
      await tProductInventoryRepo.updateTProductInventory({ updateSet, updateWhere }, transaction)

      await tCartRepo.updateTCart({ updateSet: { record_status: 'I' }, updateWhere: { cart_id } }, transaction)

      //* manage data before insert cart
      let newOrder = { ...findCart, record_status, created_by, updated_by }
      const createdOrder = await tOrderRepo.createTOrder(newOrder, transaction)
      return createdOrder
    })

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.cancelOrderById = async (req, res) => {
  try {
    let { order_id } = req.params
    let { updated_by = 'Admin' } = req.body

    const findOrder = await tOrderRepo.findOneTOrder({ order_id })
    if (!findOrder) throw httpStatus.REQ_DOES_EXIT

    await sequelize.transaction(async (transaction) => {
      let { inventory_code, product_code, total_amount } = findOrder
      const getProductInventory = await tProductInventoryRepo.findOneTProductInventory({ inventory_code, product_code })
      const { product_amount } = getProductInventory

      let updateSetProductInventory = { product_amount: parseInt(product_amount) + parseInt(total_amount) }
      let updateWhereProductInventory = { inventory_code, product_code }
      await tProductInventoryRepo.updateTProductInventory({ updateSet: updateSetProductInventory, updateWhere: updateWhereProductInventory }, transaction)

      let updateSetOrder = { record_status: 'I', updated_by }
      let updateWhereOrder = { order_id }
      await tOrderRepo.updateTOrder({ updateSet: updateSetOrder, updateWhere: updateWhereOrder }, transaction)
    })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
