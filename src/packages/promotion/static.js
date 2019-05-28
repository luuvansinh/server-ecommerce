import { PromotionModel } from '../../model'
import { to } from '../../utils';
import dbQuery from './query'

const findByCondition = async (condition, { page, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(PromotionModel.find(query).skip(page * limit).limit(limit).sort(sort))
  return data
}

const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(PromotionModel.countDocuments(query))
  return data
}

const newDoc = async (data) => {
  const doc = new PromotionModel(data)
  const result = await to(doc.save())
  return result
}

const updateDoc = async (doc, data) => {
  Object.assign(doc, data)
  const result = await to(doc.save())
  return result
}

export default {
  newDoc,
  updateDoc,
  findByCondition,
  countByCondition,
}
