const { m_inventory, sequelize } = require('../models')
const { QueryTypes, Op, fn, col } = require('sequelize')

module.exports.inquiryInventory = async ({ condition, bind, pagination }) => {
  try {
    let query = `
    select a.* ,
    (	select coalesce(json_agg(item),'[]'::json)
      from (
        select b.product_inventory_id ,b.product_code ,c.product_name_th ,c.product_name_en ,
        c.price ,c.product_detail ,b.product_amount
        from ecommerce.t_product_inventory b
        left join ecommerce.m_product c
          on b.product_code = c.product_code
          and c.record_status = 'A'
        where a.inventory_code = b.inventory_code 
        and b.record_status = 'A'
        order by b.product_code
      ) item
    ) as products
    from ecommerce.m_inventory a
    where 1 = 1
    ${condition}
    group by a.inventory_id
    ${pagination}
    `

    let queryCount = `
    select count(*)
    from ecommerce.m_inventory a
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

module.exports.getInventoryById = async ({ inventory_id }) => {
  try {
    let query = `
    select a.* ,
    (	select coalesce(json_agg(item),'[]'::json)
      from (
        select b.product_inventory_id ,b.product_code ,c.product_name_th ,c.product_name_en ,
        c.price ,c.product_detail ,b.product_amount
        from ecommerce.t_product_inventory b
        left join ecommerce.m_product c
          on b.product_code = c.product_code
          and c.record_status = 'A'
        where a.inventory_code = b.inventory_code 
        and b.record_status = 'A'
        order by b.product_code
      ) item
    ) as products
    from ecommerce.m_inventory a
    where a.inventory_id = $inventory_id
    `

    const result = await sequelize.query(query, { bind: { inventory_id }, type: QueryTypes.SELECT, plain: true })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.bulkCreateMInventory = async (body, transaction) => {
  try {
    let result = await m_inventory.bulkCreate(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.createMInventory = async (body, transaction) => {
  try {
    let result = await m_inventory.create(body, { transaction })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateMInventory = async ({ updateSet, updateWhere }, transaction) => {
  try {
    let result = await m_inventory.update(updateSet, {
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

module.exports.findOneMInventory = async (attributes) => {
  try {
    let result = await m_inventory.findOne({
      where: attributes,
    })

    return result
  } catch (error) {
    throw error
  }
}
