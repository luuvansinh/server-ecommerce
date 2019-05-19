import moment from 'moment'
import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';
import configs from '../../configs';

const orderStatus = configs.validation.order.status

const findByCondition = ({ _id, user, status, startAt, endAt, date }) => {
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

  if (startAt && endAt) {
    condition.createdAt = {
      $gte: moment(startAt).startOf('d').toDate(),
      $lte: moment(endAt).endOf('d').toDate(),
    }
  }
  if (date) {
    condition.createdAt = {
      $gte: moment(date).startOf('d').toDate(),
      $lte: moment(date).endOf('d').toDate(),
    }
  }
  return condition
}

export default {
  findByCondition,
}
