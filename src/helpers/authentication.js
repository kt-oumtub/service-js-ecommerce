const jwt = require('jsonwebtoken')

module.exports.createToken = async (user, expire) => {
  let expiresin
  if (expire === '24h' || expire === '1d') expiresin = 24 * 60 * 60
  else expiresin = parseInt(expire) * 60

  let accesstoken = jwt.sign(user, process.env.JWT_KEY, { expiresIn: expiresin })
  let token = { accesstoken, expiresin }

  return token
}

module.exports.createRenewToken = async (user, expire) => {
  let renewExpiresin
  if (expire === '24h' || expire === '1d') renewExpiresin = 24 * 60 * 60
  else renewExpiresin = parseInt(expire) * 60

  let renewtoken = jwt.sign(user, process.env.JWT_RENEW_KEY, { expiresIn: renewExpiresin })
  let token = { renewtoken, renewExpiresin }

  return token
}

module.exports.verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_RENEW_KEY)
}

module.exports.decodeToken = async (token) => {
  return jwt.decode(token)
}
