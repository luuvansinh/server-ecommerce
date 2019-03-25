import { response } from '../../utils'
import { UserModel } from '../../model'
import configs from '../../configs';

/**
 *  Get current user info
 */
const currentUserInfo = async (req, res) => {
  const user = await UserModel.getInfo(req.user._id)

  if (!user) {
    return response.r401(res, configs.message.requireAuth)
  }

  return response.r200(res, { user })
}

export default {
  currentUserInfo,
}
