import { validation } from '../../utils';
import { ObjectId } from '../../utils/mongoose';

const findByCondition = ({ _id, _ids }) => {
  const condition = {}

  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  if (_ids) {
    _ids = _ids.map(id => new ObjectId(id))
    condition._id = {
      $in: _ids,
    }
  }

  return condition
}

export default {
  findByCondition,
}
