import { response, to, getError } from '../../utils'
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

const updateInfo = async (req, res) => {
  const { error } = await to(UserModel.findByIdAndUpdate(req.user._id, {
    $set: req.body,
  }))

  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res)
}

export default {
  currentUserInfo,
  updateInfo,
}
