const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')

const tCartRepo = require('../repository/t_cart_repo.js')
const tProductInventoryRepo = require('../repository/t_product_inventory_repo.js')

module.exports.getCartDetailByUserId = async (req, res) => {
  try {
    let { user_id } = req.query

    let result = await tCartRepo.getCartDetailByUserId({ user_id })

    res.send(setStatusSuccess(httpStatus.SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.createCart = async (req, res) => {
  try {
    let { product_inventory_id, product_quantity, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    if (product_quantity < 0) throw httpStatus.INVALID_PARAMETER

    let getProductInventory = await tProductInventoryRepo.findOneTProductInventory({ product_inventory_id })
    let { inventory_code, product_code } = getProductInventory

    let newCart = { ...req.body, inventory_code, product_code, record_status, created_by, updated_by }
    const result = await tCartRepo.createTCart(newCart)

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.updateCartById = async (req, res) => {
  try {
    let { cart_id } = req.params
    let { product_inventory_id, product_quantity, updated_by = 'Admin' } = req.body

    let findCartExist = await tCartRepo.findOneTCart({ cart_id })
    if (!findCartExist) throw httpStatus.REQ_DOES_EXIT
    if (product_quantity < 0) throw httpStatus.INVALID_PARAMETER

    let getProductInventory = await tProductInventoryRepo.findOneTProductInventory({ product_inventory_id })
    let { inventory_code, product_code } = getProductInventory

    let updateSet = { ...req.body, inventory_code, product_code, updated_by }
    let updateWhere = { cart_id }
    const updatedCart = await tCartRepo.updateTCart({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.UPDATE_SUCCESS, updatedCart?.[1]))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.deleteCartById = async (req, res) => {
  try {
    let { cart_id } = req.params
    let { updated_by = 'Admin' } = req.body

    let updateSet = { record_status: 'D', updated_by }
    let updateWhere = { cart_id }
    await tCartRepo.updateTCart({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
