module.exports.inventorySchema = {
  inquiryInventory: {
    search: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
    },
    inventory_code: {
      in: ['query'],
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
    page_no: {
      in: ['query'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    page_size: {
      in: ['query'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    sort: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      trim: true,
    },
  },

  getInventoryById: {
    inventory_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
  },

  createInventory: {
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
    inventory_name_th: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
    inventory_name_en: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
    record_status: {
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

  updateInventoryById: {
    inventory_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    inventory_code: {
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
    inventory_name_th: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
    inventory_name_en: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
    record_status: {
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

  deleteInventoryById: {
    inventory_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
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
