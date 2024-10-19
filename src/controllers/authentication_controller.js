const { setStatusError, setStatusSuccess } = require('../helpers/response_body.js')
const httpStatus = require('../helpers/http_status.js')
const { createToken, createRenewToken } = require('../helpers/authentication')

const mUserRepo = require('../repository/m_user_repo.js')
const bcrypt = require('bcrypt')

module.exports.createUser = async (req, res) => {
  try {
    let { username, password, record_status = 'A', created_by = 'Admin' } = req.body
    const updated_by = created_by

    const findDuplicate = await mUserRepo.findOneMUser({ username })
    if (findDuplicate) throw httpStatus.DUPLICATE_DATA({ username })

    const salt = bcrypt.genSaltSync(10)
    const hashPwd = bcrypt.hashSync(password, salt)

    let newUser = { ...req.body, password: hashPwd, record_status, created_by, updated_by }
    let result = await mUserRepo.createMUser(newUser)

    res.send(setStatusSuccess(httpStatus.CREATE_SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.updateUserById = async (req, res) => {
  try {
    let { user_id } = req.params
    let { password, updated_by = 'Admin' } = req.body

    const findExist = await mUserRepo.findOneMUser({ user_id })
    if (!findExist) throw httpStatus.REQ_DOES_EXIT

    let updateSet = { ...req.body, updated_by }
    let updateWhere = { user_id }
    if (password) {
      const salt = bcrypt.genSaltSync(10)
      const hashPwd = bcrypt.hashSync(password, salt)
      updateSet.password = hashPwd
    }

    let result = await mUserRepo.updateMUser({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.UPDATE_SUCCESS, result[1]))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.deleteUserById = async (req, res) => {
  try {
    let { user_id } = req.params
    let { updated_by = 'Admin' } = req.body

    let updateSet = { record_status: 'D', updated_by }
    let updateWhere = { user_id }
    await mUserRepo.updateMUser({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.DELETE_SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.login = async (req, res) => {
  try {
    let { username, password } = req.body

    let hashPwd = await mUserRepo.getValidUserWithPassword({ bind: { username } })
    if (!hashPwd) throw httpStatus.INVALID_AUTH

    const compared = bcrypt.hashSync(password, hashPwd.password)
    if (!compared) throw httpStatus.INVALID_AUTH

    let condition = `
    and username = $username
    and password = $password\n`
    let bind = { username, password: compared }

    let profile = await mUserRepo.getValidUser({ condition, bind })
    if (!profile) throw httpStatus.INVALID_AUTH

    let result = { profile }

    // //todo generate accessToken
    let expMin = process.env.JWT_EXPIRE || '60'
    let renewExpireMin = process.env.JWT_RENEW_EXPIRE || '120'
    let jwtObject = {
      user_id: profile?.user_id,
      username: profile?.username,
      email: profile?.email,
      is_logged_in: true,
      user_fname_th: profile?.user_fname_th,
      user_fname_en: profile?.user_fname_en,
      user_lname_th: profile?.user_lname_th,
      user_lname_en: profile?.user_lname_en,
    }

    const tokenData = await createToken(jwtObject, parseInt(expMin))
    const renewData = await createRenewToken(jwtObject, parseInt(renewExpireMin))

    result.access_token = tokenData.accesstoken
    result.expiresin = tokenData.expiresin
    result.renew_token = renewData.renewtoken
    result.renew_expiresin = renewData.renewExpiresin

    let updateSet = { is_logged_in: true }
    let updateWhere = { user_id: profile?.user_id }
    await mUserRepo.updateMUser({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.SUCCESS, result))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}

module.exports.logout = async (req, res) => {
  try {
    let { user_id } = req.body

    let updateSet = { is_logged_in: false }
    let updateWhere = { user_id }
    await mUserRepo.updateMUser({ updateSet, updateWhere })

    res.send(setStatusSuccess(httpStatus.SUCCESS))
  } catch (error) {
    console.log(error)
    res.send(setStatusError(error, null))
  }
}
