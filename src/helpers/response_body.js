const res = require('express/lib/response')

module.exports.setStatusSuccess = (status, data, total) => {
  const result = {
    status: {
      code: '',
      description: '',
    },
    data: {},
    total: {},
  }

  result.status.code = status.code == '200' ? '' : status.businessCode
  result.status.description = status?.description
  result.data = data
  result.total = total

  res.status(parseInt(status.code))
  return result
}

module.exports.setStatusError = (status, data) => {
  const result = {
    status: {
      code: '',
      description: '',
    },
    data: {},
  }

  result.status.code = status?.businessCode ? status?.businessCode : 5001
  result.status.description = status?.description ? status?.description : 'Others error'
  result.data = data

  if (status?.description && status?.description === 'Validate error') result.status.errors = status.errors
  if (status?.description && status?.description === 'Business error') result.status.errors = status.errors

  res.status(parseInt(status?.code ? status?.code : 500))
  return result
}
