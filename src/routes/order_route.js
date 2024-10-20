const router = require('express').Router()

const orderController = require('../controllers/order_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { orderSchema } = require('../validation/schemas/order_validate_schema.js')

router.post(
  '/',
  validateSchemaField(orderSchema.createOrder),
  validateSchemaType(orderSchema.createOrder),
  handleErrorValidateSchemaType,

  orderController.createOrder
)

router.patch(
  '/:order_id',
  validateSchemaField(orderSchema.cancelOrderById),
  validateSchemaType(orderSchema.cancelOrderById),
  handleErrorValidateSchemaType,
  orderController.cancelOrderById
)

module.exports = router
