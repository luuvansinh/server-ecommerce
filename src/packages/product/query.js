import { validation, format } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

const findByCondition = ({ keyword, _id, status }) => {
  const condition = {}

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  if (keyword) {
    condition.searchString = format.searchString(keyword)
  }

  if (validation.isBoolean(status)) {
    condition.active = status
  }
  return condition
}

export default {
  findByCondition,
}
