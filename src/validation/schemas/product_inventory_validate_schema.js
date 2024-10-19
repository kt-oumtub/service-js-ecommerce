module.exports.productInventorySchema = {
  maintainProductInventory: {
    inventory_code: {
      in: ['body'],
      optional: false,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 20 characters',
        options: { max: 20 },
      },
      trim: true,
    },
    products: {
      in: ['body'],
      optional: true,
      isArray: {
        errorMessage: 'should be use Array type or required!',
      },
    },
    'products.*.product_inventory_id': {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    'products.*.product_code': {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 20 characters',
        options: { max: 20 },
      },
      trim: true,
    },
    'products.*.product_amount': {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    'products.*.record_status': {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 1 characters',
        options: { max: 1 },
      },
      trim: true,
    },
    created_by: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 20 characters',
        options: { max: 20 },
      },
      trim: true,
    },
  },

  deleteProductInventory: {
    inventory_code: {
      in: ['body'],
      optional: false,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 20 characters',
        options: { max: 20 },
      },
      trim: true,
    },
    updated_by: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 20 characters',
        options: { max: 20 },
      },
      trim: true,
    },
  },
}
