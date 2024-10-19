const router = require('express').Router()

const cartController = require('../controllers/cart_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { cartSchema } = require('../validation/schemas/cart_validate_schema.js')

router.get(
  '/',
  validateSchemaField(cartSchema.getCartDetailByUserId),
  validateSchemaType(cartSchema.getCartDetailByUserId),
  handleErrorValidateSchemaType,
  cartController.getCartDetailByUserId
)

router.post(
  '/',
  validateSchemaField(cartSchema.createCart),
  validateSchemaType(cartSchema.createCart),
  handleErrorValidateSchemaType,

  cartController.createCart
)

router.patch(
  '/:cart_id',
  validateSchemaField(cartSchema.updateCartById),
  validateSchemaType(cartSchema.updateCartById),
  handleErrorValidateSchemaType,
  cartController.updateCartById
)

router.delete(
  '/:cart_id',
  validateSchemaField(cartSchema.deleteCartById),
  validateSchemaType(cartSchema.deleteCartById),
  handleErrorValidateSchemaType,
  cartController.deleteCartById
)

module.exports = router
