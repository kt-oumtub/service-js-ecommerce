const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')

const { fn, Op } = require('sequelize')
const mProductRepo = require('../repository/m_product_repo.js')

module.exports.inquiryProduct = async (req, res) => {
  try {
    let { search, brand, price, page_no, page_size, sort = 'product_code' } = req.query
    let condition = ``
    let bind = {}
    let pagination = ``

    if (brand) (condition += `and brand = $brand\n`), (bind.brand = brand)
    if (price) (condition += `and price <= $price\n`), (bind.price = price)
    if (search) {
      condition += `and (product_name_th ilike $search or product_name_en ilike $search)\n`
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

    let { result, total } = await mProductRepo.inquiryProduct({ condition, bind, pagination })
    let count = total[0]?.count ?? 0

    res.send(setStatusSuccess(httpStatus.SUCCESS, result, count))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.getProductById = async (req, res) => {
  try {
    let { product_id } = req.params

    let result = await mProductRepo.getProductById({ product_id })

    res.send(setStatusSuccess(httpStatus.SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.createProduct = async (req, res) => {
  try {
    let { product_code, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    const findDuplicate = await mProductRepo.findOneMProduct({ product_code })
    if (findDuplicate) throw httpStatus.DUPLICATE_DATA({ product_code })

    let newProduct = { ...req.body, record_status, created_by, updated_by }
    let result = await mProductRepo.createMProduct(newProduct)

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.updateProductById = async (req, res) => {
  try {
    let { product_id } = req.params
    let { product_code, updated_by = 'Admin' } = req.body

    const findExist = await mProductRepo.findOneMProduct({ product_id })
    if (!findExist) throw httpStatus.REQ_DOES_EXIT

    if (product_code) {
      const findDuplicate = await mProductRepo.findOneMProduct({ product_code, product_id: { [Op.ne]: product_id }, record_status: { [Op.ne]: 'D' } })
      if (findDuplicate) throw httpStatus.DUPLICATE_DATA({ product_code })
    }

    let updateSet = { ...req.body, updated_by }
    let updateWhere = { product_id }
    let result = await mProductRepo.updateMProduct({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.UPDATE_SUCCESS, result[1]))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.deleteProductById = async (req, res) => {
  try {
    let { product_id } = req.params
    let { updated_by = 'Admin' } = req.body

    let updateSet = { record_status: 'D', updated_by }
    let updateWhere = { product_id }
    await mProductRepo.updateMProduct({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
