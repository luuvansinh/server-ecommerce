import { validation, format } from '../../utils';
import { ObjectId } from '../../utils/mongoose'

const findByCondition = ({ phone, _id, email, keyword }) => {
  const condition = {}

  if (phone) {
    condition.phone = phone
  }

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  if (email) {
    condition.email = email
  }

  if (keyword) {
    condition.searchString = format.searchString(keyword)
  }
  return condition
}

export default {
  findByCondition,
}
