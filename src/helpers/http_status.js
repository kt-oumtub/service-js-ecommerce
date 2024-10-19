module.exports = {
  SUCCESS: {
    code: '200',
    businessCode: '',
    description: 'Success',
  },

  UPDATE_SUCCESS: {
    code: '200',
    businessCode: '',
    description: 'Data successfully updated',
  },

  DELETE_SUCCESS: {
    code: '200',
    businessCode: '',
    description: 'Data successfully deleted',
  },

  CREATE_SUCCESS: {
    code: '201',
    businessCode: '',
    description: 'Creation successful',
  },

  MISSING_REQUIRED: (fieldName = '') => ({
    code: '400',
    businessCode: '4000',
    description: 'Missing required parameters ' + Object.keys(fieldName),
  }),

  INVALID_AUTH: {
    code: '401',
    businessCode: '4010',
    description: 'Invalid authorization',
  },

  INVALID_TOKEN: {
    code: '401',
    businessCode: '4011',
    description: 'Invalid refresh token',
  },

  INVALID_PARAMETER: {
    code: '400',
    businessCode: '4001',
    description: 'Invalid parameters entered',
  },

  CAN_NOT_DELETE: {
    code: '400',
    businessCode: '4004',
    description: 'Cannot delete the object',
  },

  REQ_DOES_EXIT: {
    code: '404',
    businessCode: '4002',
    description: 'Requested entity record does not exist',
  },

  NOT_FOUND: (fieldName = '') => ({
    code: '404',
    businessCode: '4003',
    description: 'Not found ' + Object.keys(fieldName),
  }),

  DUPLICATE_DATA: (fieldName = '') => ({
    code: '400',
    businessCode: '4005',
    description: 'Duplicate data ' + Object.keys(fieldName),
  }),

  VALIDATE_ERROR: (msgArr) => ({
    code: '400',
    businessCode: '4006',
    description: 'Validate error',
    errors: msgArr,
  }),

  NOT_ALLOW_INPUT_TYPE: {
    code: '400',
    businessCode: '4007',
    description: 'Not allow file types for file upload.',
  },

  NOT_ALLOW_INPUT_FIELD: {
    code: '400',
    businessCode: '4008',
    description: 'Not allow input field.',
  },

  FILE_SIZE_LIMIT: {
    code: '400',
    businessCode: '4009',
    description: 'The file {file_name} is too big to be uploaded',
  },

  UNABLE_PROCESS: {
    code: '500',
    businessCode: '5000',
    description: 'Unable process request',
  },

  TIME_OUT: {
    code: '504',
    businessCode: '5040',
    description: 'API Timeout',
  },

  CUSTOM_ERROR: (code, businessCode, description, msgArr) => ({
    code,
    businessCode,
    description,
    errors: msgArr,
  }),
}
