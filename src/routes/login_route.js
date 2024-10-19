const router = require('express').Router()

const authController = require('../controllers/authentication_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { registerSchema } = require('../validation/schemas/register_validate_schema.js')

router.post(
  '/',
  validateSchemaField(registerSchema.login),
  validateSchemaType(registerSchema.login),
  handleErrorValidateSchemaType,

  authController.login
)

module.exports = router
