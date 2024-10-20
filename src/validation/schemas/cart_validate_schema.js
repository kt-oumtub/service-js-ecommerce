module.exports.cartSchema = {
  getCartDetailByUserId: {
    user_id: {
      in: ['query'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
  },

  createCart: {
    user_id: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    product_inventory_id: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    // inventory_code: {
    //   in: ['body'],
    //   optional: false,
    //   isString: {
    //     errorMessage: 'should be use String type or required!',
    //   },
    //   isLength: {
    //     errorMessage: 'no more than 20 characters',
    //     options: { max: 20 },
    //   },
    //   trim: true,
    // },
    // product_code: {
    //   in: ['body'],
    //   optional: false,
    //   isString: {
    //     errorMessage: 'should be use String type or required!',
    //   },
    //   isLength: {
    //     errorMessage: 'no more than 20 characters',
    //     options: { max: 20 },
    //   },
    //   trim: true,
    // },
    product_quantity: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
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

  updateCartById: {
    cart_id: {
      in: ['params'],
      optional: true,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    // inventory_code: {
    //   in: ['body'],
    //   optional: false,
    //   isString: {
    //     errorMessage: 'should be use String type or required!',
    //   },
    //   isLength: {
    //     errorMessage: 'no more than 20 characters',
    //     options: { max: 20 },
    //   },
    //   trim: true,
    // },
    // product_code: {
    //   in: ['body'],
    //   optional: false,
    //   isString: {
    //     errorMessage: 'should be use String type or required!',
    //   },
    //   isLength: {
    //     errorMessage: 'no more than 20 characters',
    //     options: { max: 20 },
    //   },
    //   trim: true,
    // },
    product_inventory_id: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    product_quantity: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
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

  deleteCartById: {
    cart_id: {
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
