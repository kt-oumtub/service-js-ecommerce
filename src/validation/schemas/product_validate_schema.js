module.exports.productSchema = {
  inquiryProduct: {
    search: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
    },
    brand: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 50 characters',
        options: { max: 50 },
      },
      trim: true,
    },
    price: {
      in: ['query'],
      optional: true,
      isDecimal: {
        errorMessage: 'should be use Decimal type or required!',
      },
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

  getProductById: {
    product_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
  },

  createProduct: {
    product_code: {
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
    product_name_th: {
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
    product_name_en: {
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
    product_detail: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 500 characters',
        options: { max: 500 },
      },
      trim: true,
    },
    price: {
      in: ['body'],
      optional: true,
      isNumeric: {
        errorMessage: 'should be use Numeric type or required!',
      },
    },
    brand: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 50 characters',
        options: { max: 50 },
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

  updateProductById: {
    product_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    product_code: {
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
    product_name_th: {
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
    product_name_en: {
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
    product_detail: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 500 characters',
        options: { max: 500 },
      },
      trim: true,
    },
    price: {
      in: ['body'],
      optional: true,
      isNumeric: {
        errorMessage: 'should be use Numeric type or required!',
      },
    },
    brand: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 50 characters',
        options: { max: 50 },
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

  deleteProductById: {
    product_id: {
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
