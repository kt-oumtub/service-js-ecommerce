module.exports.registerSchema = {
  createUser: {
    username: {
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
    password: {
      in: ['body'],
      optional: false,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
    email: {
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
    user_fname_th: {
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
    user_fname_en: {
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
    user_lname_th: {
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
    user_lname_en: {
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

  updateUserById: {
    user_id: {
      in: ['params'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
    password: {
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
    email: {
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
    user_fname_th: {
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
    user_fname_en: {
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
    user_lname_th: {
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
    user_lname_en: {
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

  deleteUserById: {
    user_id: {
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

  login: {
    username: {
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
    password: {
      in: ['body'],
      optional: false,
      isString: {
        errorMessage: 'should be use String type or required!',
      },
      isLength: {
        errorMessage: 'no more than 100 characters',
        options: { max: 100 },
      },
      trim: true,
    },
  },

  logout: {
    user_id: {
      in: ['body'],
      optional: false,
      isInt: {
        errorMessage: 'should be use Int type or required!',
      },
    },
  },
}
