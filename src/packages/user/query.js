import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose'

const findByCondition = ({ phone, _id, email }) => {
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
  return condition
}

export default {
  findByCondition,
}
