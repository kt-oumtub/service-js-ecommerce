module.exports.orderSchema = {
  getOrderHistoryByUserId: {
    user_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
  },

  createOrder: {
    cart_id: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
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

  cancelOrderById: {
    order_id: {
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
