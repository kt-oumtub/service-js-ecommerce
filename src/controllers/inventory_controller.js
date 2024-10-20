const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')

const { fn, Op } = require('sequelize')
const mInventoryRepo = require('../repository/m_inventory_repo.js')

module.exports.inquiryInventory = async (req, res) => {
  try {
    let { search, inventory_code, page_no, page_size, sort = 'inventory_code' } = req.query
    let condition = ``
    let bind = {}
    let pagination = ``

    if (inventory_code) (condition += `and a.inventory_code = $inventory_code\n`), (bind.inventory_code = inventory_code)
    if (search) {
      condition += `and (a.inventory_name_th ilike $search or a.inventory_name_en ilike $search)\n`
      bind.search = '%' + search + '%'
    }
    if (sort) {
      let orderBy = `ORDER BY `
      let arrSort = sort.split(',')
      arrSort.map((val, i) => {
        val.charAt(0) === '-' ? (arrSort[i] = val.slice(1) + ' DESC') : (arrSort[i] += ' ASC')
        i != arrSort.length - 1 ? (orderBy += arrSort[i] + ' , ') : (orderBy += arrSort[i] + '\n')
      })
      pagination += orderBy
    }
    if (page_no && page_size) pagination += `OFFSET ${(page_no - 1) * page_size} LIMIT ${page_size}`

    let { result, total } = await mInventoryRepo.inquiryInventory({ condition, bind, pagination })
    let count = total[0]?.count ?? 0

    res.send(setStatusSuccess(httpStatus.SUCCESS, result, count))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.getInventoryById = async (req, res) => {
  try {
    let { inventory_id } = req.params

    let result = await mInventoryRepo.getInventoryById({ inventory_id })

    res.send(setStatusSuccess(httpStatus.SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.createInventory = async (req, res) => {
  try {
    let { inventory_code, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    const findDuplicate = await mInventoryRepo.findOneMInventory({ inventory_code })
    if (findDuplicate) throw httpStatus.DUPLICATE_DATA({ inventory_code })

    let newInventory = { ...req.body, record_status, created_by, updated_by }
    let result = await mInventoryRepo.createMInventory(newInventory)

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.updateInventoryById = async (req, res) => {
  try {
    let { inventory_id } = req.params
    let { inventory_code, updated_by = 'Admin' } = req.body

    const findExist = await mInventoryRepo.findOneMInventory({ inventory_id })
    if (!findExist) throw httpStatus.REQ_DOES_EXIT

    if (inventory_code) {
      const findDuplicate = await mInventoryRepo.findOneMInventory({ inventory_code, inventory_id: { [Op.ne]: inventory_id }, record_status: { [Op.ne]: 'D' } })
      if (findDuplicate) throw httpStatus.DUPLICATE_DATA({ inventory_code })
    }

    let updateSet = { ...req.body, updated_by }
    let updateWhere = { inventory_id }
    let result = await mInventoryRepo.updateMInventory({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.UPDATE_SUCCESS, result[1]))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.deleteInventoryById = async (req, res) => {
  try {
    let { inventory_id } = req.params
    let { updated_by = 'Admin' } = req.body

    let updateSet = { record_status: 'D', updated_by }
    let updateWhere = { inventory_id }
    await mInventoryRepo.updateMInventory({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
