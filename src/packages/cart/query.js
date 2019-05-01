import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';

const findByCondition = ({ user }) => {
  const condition = {}

  if (validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }
  return condition
}

export default {
  findByCondition,
}
