const router = require('express').Router()

const registerController = require('../controllers/authentication_controller.js')

const { validateSchemaField, validateSchemaType, handleErrorValidateSchemaType } = require('../validation')
const { registerSchema } = require('../validation/schemas/register_validate_schema.js')

router.post(
  '/',
  validateSchemaField(registerSchema.createUser),
  validateSchemaType(registerSchema.createUser),
  handleErrorValidateSchemaType,
  registerController.createUser
)

router.patch(
  '/:user_id',
  validateSchemaField(registerSchema.updateUserById),
  validateSchemaType(registerSchema.updateUserById),
  handleErrorValidateSchemaType,
  registerController.updateUserById
)

router.delete(
  '/:user_id',
  validateSchemaField(registerSchema.deleteUserById),
  validateSchemaType(registerSchema.deleteUserById),
  handleErrorValidateSchemaType,
  registerController.deleteUserById
)

module.exports = router
