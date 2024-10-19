const router = require('express').Router()

const productController = require('../controllers/product_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { productSchema } = require('../validation/schemas/product_validate_schema.js')

router.get(
  '/',
  validateSchemaField(productSchema.inquiryProduct),
  validateSchemaType(productSchema.inquiryProduct),
  handleErrorValidateSchemaType,
  productController.inquiryProduct
)

router.get(
  '/:product_id',
  validateSchemaField(productSchema.getProductById),
  validateSchemaType(productSchema.getProductById),
  handleErrorValidateSchemaType,
  productController.getProductById
)

router.post(
  '/',
  validateSchemaField(productSchema.createProduct),
  validateSchemaType(productSchema.createProduct),
  handleErrorValidateSchemaType,
  productController.createProduct
)

router.patch(
  '/:product_id',
  validateSchemaField(productSchema.updateProductById),
  validateSchemaType(productSchema.updateProductById),
  handleErrorValidateSchemaType,
  productController.updateProductById
)

router.delete(
  '/:product_id',
  validateSchemaField(productSchema.deleteProductById),
  validateSchemaType(productSchema.deleteProductById),
  handleErrorValidateSchemaType,
  productController.deleteProductById
)

module.exports = router
