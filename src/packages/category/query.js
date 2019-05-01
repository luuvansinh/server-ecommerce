import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';

const findByCondition = ({ _id }) => {
  const condition = {}

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  return condition
}

export default {
  findByCondition,
}
