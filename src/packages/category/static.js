import { CategoryModel } from '../../model'
import { to } from '../../utils'
import dbQuery from './query'

/**
 * Find docs by condition
 */
const findByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CategoryModel.find(query).sort('-createdAt').lean())
  return data
}

/**
 * Save new doc
 */
const newDoc = async (doc) => {
  const category = new CategoryModel(doc)
  const result = await to(category.save())
  return result
}

/**
 * Update doc by _id
 */
const updateById = async (_id, data) => {
  const result = await to(CategoryModel.update({ _id }, data))
  return result
}

export default {
  newDoc,
  findByCondition,
  updateById,
}
