const router = require('express').Router()

const orderController = require('../controllers/order_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { orderSchema } = require('../validation/schemas/order_validate_schema.js')

router.get(
  '/:user_id',
  validateSchemaField(orderSchema.getOrderHistoryByUserId),
  validateSchemaType(orderSchema.getOrderHistoryByUserId),
  handleErrorValidateSchemaType,
  orderController.getOrderHistoryByUserId
)

module.exports = router
