const router = require('express').Router()

const inventoryController = require('../controllers/inventory_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { inventorySchema } = require('../validation/schemas/inventory_validate_schema.js')

router.get(
  '/',
  validateSchemaField(inventorySchema.inquiryInventory),
  validateSchemaType(inventorySchema.inquiryInventory),
  handleErrorValidateSchemaType,
  inventoryController.inquiryInventory
)

router.get(
  '/:inventory_id',
  validateSchemaField(inventorySchema.getInventoryById),
  validateSchemaType(inventorySchema.getInventoryById),
  handleErrorValidateSchemaType,
  inventoryController.getInventoryById
)

router.post(
  '/',
  validateSchemaField(inventorySchema.createInventory),
  validateSchemaType(inventorySchema.createInventory),
  handleErrorValidateSchemaType,
  inventoryController.createInventory
)

router.patch(
  '/:inventory_id',
  validateSchemaField(inventorySchema.updateInventoryById),
  validateSchemaType(inventorySchema.updateInventoryById),
  handleErrorValidateSchemaType,
  inventoryController.updateInventoryById
)

router.delete(
  '/:inventory_id',
  validateSchemaField(inventorySchema.deleteInventoryById),
  validateSchemaType(inventorySchema.deleteInventoryById),
  handleErrorValidateSchemaType,
  inventoryController.deleteInventoryById
)

module.exports = router
