const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')

const tCartRepo = require('../repository/t_cart_repo.js')
const tProductInventoryRepo = require('../repository/t_product_inventory_repo.js')
const mInventoryRepo = require('../repository/m_inventory_repo.js')

const sequelize = require('../config/database')

// module.exports.inquiryCart = async (req, res) => {
//   try {
//     let { search, page_no, page_size, sort = 'inventory_code' } = req.query
//     let condition = ``
//     let bind = {}
//     let pagination = ``

//     if (sort) {
//       let orderBy = `ORDER BY `
//       let arrSort = sort.split(',')
//       arrSort.map((val, i) => {
//         val.charAt(0) === '-' ? (arrSort[i] = val.slice(1) + ' DESC') : (arrSort[i] += ' ASC')
//         i != arrSort.length - 1 ? (orderBy += arrSort[i] + ' , ') : (orderBy += arrSort[i] + '\n')
//       })
//       pagination += orderBy
//     }
//     if (page_no && page_size) pagination += `OFFSET ${(page_no - 1) * page_size} LIMIT ${page_size}`

//     let { result, total } = await tCartRepo.inquiryCart({ condition, bind, pagination })
//     let count = total[0]?.count ?? 0

//     res.send(setStatusSuccess(httpStatus.SUCCESS, result, count))
//   } catch (error) {
//     console.log(error)
//     res.send(setStatusError(error, null))
//   }
// }

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
    let { inventory_code, product_code, product_quantity, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    if (product_quantity < 0) throw httpStatus.INVALID_PARAMETER

    // let result = await sequelize.transaction(async (transaction) => {
    // //* get old data for cal product amount
    // let getProductInventory = await tProductInventoryRepo.findOneTProductInventory({ inventory_code, product_code, record_status: 'A' })
    // let new_product_amount = getProductInventory.product_amount - product_quantity
    // if (new_product_amount < 0) throw httpStatus.UNABLE_PROCESS

    // //* update data of product and inventory
    // let updateSet = { product_amount: new_product_amount }
    // let updateWhere = { inventory_code, product_code }
    // await tProductInventoryRepo.updateTProductInventory({ updateSet, updateWhere }, transaction)

    //* manage data before insert cart
    // let newCart = { ...req.body, record_status, created_by, updated_by }
    // const createdCart = await tCartRepo.createTCart(newCart)
    // return createdCart
    // })

    let newCart = { ...req.body, record_status, created_by, updated_by }
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
    let { inventory_code, product_code, product_quantity, record_status = 'A', updated_by = 'Admin' } = req.body

    let findCartExist = await tCartRepo.findOneTCart({ cart_id })
    if (!findCartExist) throw httpStatus.REQ_DOES_EXIT
    if (product_quantity < 0) throw httpStatus.INVALID_PARAMETER

    // let result = await sequelize.transaction(async (transaction) => {
    //   let findCart = await tCartRepo.findOneTCart({ cart_id })
    //   if (!findCart) throw httpStatus.REQ_DOES_EXIT
    //   let new_product_quantity = findCart.product_quantity - product_quantity

    //   let getProductInventory = await tProductInventoryRepo.findOneTProductInventory({ inventory_code, product_code })
    //   let new_product_amount = getProductInventory.product_amount + new_product_quantity
    //   if (new_product_amount < 0) throw httpStatus.UNABLE_PROCESS

    //   // //* update data of product and inventory
    //   let updateSetProductInventory = { product_amount: new_product_amount }
    //   let updateWhereProductInventory = { inventory_code, product_code }
    //   await tProductInventoryRepo.updateTProductInventory({ updateSet: updateSetProductInventory, updateWhere: updateWhereProductInventory }, transaction)

    //   // //* manage data before insert cart
    //   let updateSetCart = { ...req.body, product_quantity, updated_by }
    //   let updateWhereCart = { cart_id }
    //   const updatedCart = await tCartRepo.updateTCart({ updateSet: updateSetCart, updateWhere: updateWhereCart }, transaction)

    //   return findCart
    // })

    let updateSet = { ...req.body, updated_by }
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
