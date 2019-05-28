import { validation } from '../../utils';

const findByCondition = ({ type, active }) => {
  const condition = {}

  if (type) {
    condition.type = type
  }

  if (validation.isBoolean(active)) {
    condition.active = active
  }

  return condition
}

export default {
  findByCondition,
}
