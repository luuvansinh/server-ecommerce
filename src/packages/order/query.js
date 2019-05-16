import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';
import configs from '../../configs';

const orderStatus = configs.validation.order.status

const findByCondition = ({ _id, user, status }) => {
  const condition = {}

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (user && validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }
  if (orderStatus.includes(status)) {
    condition.status = status
  }
  return condition
}

export default {
  findByCondition,
}
