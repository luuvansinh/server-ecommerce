import lodash from 'lodash'
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

const newDoc = async (data) => {
  const doc = new UserModel(data)
  const result = await to(doc.save())
  return result
}

const briefInfo = async (user) => {
  const result = lodash.pick(user, ['_id', 'name', 'email', 'phone', 'gender'])
  return result
}

const briefById = async (_id) => {
  const user = await getInfo(_id)
  const result = await briefInfo(user)
  return result
}

const updateStatistic = async (user, order) => {
  const result = await UserModel.findByIdAndUpdate(user, {
    $inc: {
      'statistic.bill': 1,
      'statistic.expense': order.total,
    },
  })
  return result
}

export default {
  findByCondition,
  countByCondition,
  findOneByCondition,
  getInfo,
  newDoc,
  briefInfo,
  briefById,
  updateStatistic,
}
