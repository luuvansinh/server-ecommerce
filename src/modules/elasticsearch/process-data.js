import lodash from 'lodash'
import { BusinessModel, UserModel } from '../../model'
import { helper } from '../../utils'


/**
 * Process business data
 *
 * @param {Object} obj business data
 */
const business = (obj) => {
  const location = helper.getLocation(obj)
  const rating = obj.rating ? obj.rating.total : 0

  const defaultObj = new BusinessModel()
  delete defaultObj._id
  obj = Object.assign(defaultObj, obj)

  return {
    ...lodash.pick(obj, ['name', 'city', 'active', 'verified', 'address', 'source', 'createdAt']),
    location,
    rating,
    isMerged: false,
  }
}

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

/**
 * Process voucher data
 *
 * @param {Object} obj voucher data
 */
const voucher = (obj) => {
  const data = obj.children.map((item) => {
    const location = helper.getLocation(item)
    return {
      ...lodash.pick(item, ['_id', 'coin', 'active']),
      location,
      name_en: item.displayName.en,
      name_vi: item.displayName.vi,
    }
  })

  return data
}

export default {
  business,
  user,
  voucher,
}
