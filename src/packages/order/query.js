import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';

const findByCondition = ({ _id, user }) => {
  const condition = {}

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (user && validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }
  return condition
}

export default {
  findByCondition,
}
