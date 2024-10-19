const router = require('express').Router()

const productInventoryController = require('../controllers/product_inventory_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { productInventorySchema } = require('../validation/schemas/product_inventory_validate_schema.js')

router.post(
  '/',
  validateSchemaField(productInventorySchema.maintainProductInventory),
  validateSchemaType(productInventorySchema.maintainProductInventory),
  handleErrorValidateSchemaType,
  productInventoryController.maintainProductInventory
)

router.post(
  '/delete',
  validateSchemaField(productInventorySchema.deleteProductInventory),
  validateSchemaType(productInventorySchema.deleteProductInventory),
  handleErrorValidateSchemaType,
  productInventoryController.deleteProductInventory
)

module.exports = router
