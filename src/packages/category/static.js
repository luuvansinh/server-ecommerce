import lodash from 'lodash'
import { CategoryModel, ProductModel } from '../../model'
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

const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CategoryModel.findOne(query))
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

const getDetail = async (_id) => {
  const category = await findOneByCondition({ _id })
  const query = { categories: _id, active: true }
  let products = await ProductModel.find(query)
  products = await Promise.all(products.map(async (item) => {
    const obj = await ProductModel.briefInfo(item)
    return obj
  }))
  return {
    ...category.toJSON(),
    products,
  }
}

const briefInfo = async (category) => {
  return lodash.pick(category, ['_id', 'name'])
}

const briefInfoByIds = async (_ids) => {
  const query = dbQuery.findByCondition({ _ids })
  const categories = await CategoryModel.find(query).lean()
  const result = await Promise.all(categories.map(async (item) => {
    const obj = await briefInfo(item)
    return obj
  }))
  return result
}

export default {
  newDoc,
  findByCondition,
  updateById,
  findOneByCondition,
  getDetail,
  briefInfoByIds,
}
