import configs from '../../configs'
import { response } from '../../utils'
import { UserModel } from '../../model'

/**
 * Get all users
 *
 */
const all = async (req, res) => {
  const { page = 0, sort } = req.query
  const limit = configs.limit.user.all

  const data = await Promise.all([{
    users: await UserModel.findByCondition(req.query, { page, limit }, sort),
    total: await UserModel.countByCondition(req.query),
    limitPerPage: limit,
  }])

  const result = data[0]

  result.users = await Promise.all(result.users.map(async (item) => {
    const obj = await UserModel.info(item)
    return obj
  }))

  return response.r200(res, result)
}


export default {
  all,
}
