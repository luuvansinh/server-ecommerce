import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose'

const findByCondition = ({ phone, _id }) => {
  const condition = {}

  if (phone) {
    condition.phone = phone
  }

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  return {}
}

export default {
  findByCondition,
}
