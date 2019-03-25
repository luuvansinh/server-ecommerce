import { response, token, facebook, getError } from '../../utils'
import { UserModel } from '../../model'
import configs from '../../configs';

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

export default {
  loginWebWithPhoneNumber,
}
