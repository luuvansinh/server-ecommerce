import lodash from 'lodash'
import { UserModel } from '../../model'


/**
 * Process user data
 *
 * @param {Object} obj user data
 */
const user = (obj) => {
  const defaultObj = new UserModel()
  delete defaultObj._id
  obj = Object.assign(defaultObj, obj)

  return lodash.pick(obj, ['name', 'nickname', 'phone', 'isLocalExpert', 'city'])
}


export default {
  user,
}
