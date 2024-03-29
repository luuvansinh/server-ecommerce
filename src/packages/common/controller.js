import { response, token, facebook, getError } from '../../utils'
import { UserModel } from '../../model'
import configs from '../../configs';

const { message } = configs
/**
 * Login web with phone number
 * Authentication code from Facebook AccountKit
 *
 */
const loginWebWithPhoneNumber = async (req, res) => {
  const { code } = req.body
  const { phone, error } = await facebook.fetchUserPhoneFromCode(code)
  // Check error when fetch user phone from code
  if (error) {
    return response.r404(res, getError.message(error))
  }
  // Check phone in db
  const user = await UserModel.findOneByCondition({ phone })
  if (!user) {
    return response.r400(res, configs.message.notRegisterAccount)
  }

  // const userInfo = await UserModel.briefInfo(result.toJSON())

  return response.r200(res, {
    token: token(user.toJSON()),
    user,
  })
}

const register = async (req, res) => {
  const { error, data } = await UserModel.newDoc(req.body)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  const user = await UserModel.briefInfo(data)
  return response.r200(res, {
    token: token(user),
    user,
  })
}

/**
 * login
 */
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOneByCondition({ email })
  if (!user) {
    return response.r400(res, message.nameOrPassIncorrect)
  }

  // Check password
  const isAuthenticated = user.authenticate(password)
  if (!isAuthenticated) {
    return response.r400(res, message.nameOrPassIncorrect)
  }

  const jsonData = user.toJSON()
  delete jsonData.salt
  delete jsonData.hashedPassword
  response.r200(res, {
    token: token(jsonData),
    user: jsonData,
  })
}

export default {
  loginWebWithPhoneNumber,
  register,
  login,
}
