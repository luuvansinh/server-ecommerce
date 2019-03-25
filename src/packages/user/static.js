import dbQuery from './query'
import { UserModel } from '../../model';
import { to } from '../../utils';


const findByCondition = async (condition, { page, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(UserModel.find(query).skip(page * limit).limit(limit).sort(sort).lean())
  return data
}

const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(UserModel.countDocuments(query))
  return data
}

const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(UserModel.findOne(query))
  return data
}

const getInfo = async (_id) => {
  const user = await findOneByCondition({ _id })
  return user
}

export default {
  findByCondition,
  countByCondition,
  findOneByCondition,
  getInfo,
}
