import lodash from 'lodash'
import faker from 'faker/locale/vi'
import { ProductModel } from '../../model'
import { to, photo } from '../../utils';
import dbQuery from './query'


const findByCondition = async (condition, { page, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(ProductModel.find(query).skip(page * limit).limit(limit).sort(sort).lean())
  return data
}

const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const numDocs = await ProductModel.countDocuments(query)
  return numDocs
}

/**
 * Save new doc
 */
const newDoc = async (doc) => {
  const product = new ProductModel(doc)
  const result = await to(product.save())
  return result
}

const updateDoc = async (doc, data) => {
  Object.assign(doc, data)
  const result = await to(doc.save())
  return result
}

/**
 * Update doc by _id
 */
const updateById = async (_id, data) => {
  const result = await to(ProductModel.update({ _id }, data))
  return result
}

const fake = async () => {
  faker.locale = 'vi'
  const products = []
  for (let i = 0; i < 20; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      desc: faker.lorem.paragraph(),
      quantity: faker.random.number(1000),
      discountPercent: faker.random.number(50),
      active: faker.random.boolean(),
    }
    products.push(product)
  }
  products.forEach(async (item) => {
    await newDoc(item)
  })
}

const briefInfo = async (product) => {
  const data = await Promise.all([{
    covers: await photo.covers(product.covers),
    currentPrice: getPrice(product),
  }])
  return {
    ...lodash.pick(product, ['_id', 'name', 'price', 'discountPercent']),
    ...data[0],
  }
}

const getPrice = (product) => {
  return Math.round(product.price * (1 - (product.discountPercent / 100)))
}

const briefInfoById = async (id) => {
  const product = await ProductModel.findById(id)
  const data = await briefInfo(product.toJSON())
  return data
}

// const briefInfoByCondition = (condition) => {
//   const query = dbQuery.findByCondition()
// }

const getDetail = async (product) => {
  const data = await Promise.all([{
    covers: await photo.covers(product.covers),
  }])
  await updateById(product._id, {
    $inc: {
      'statistic.viewed': 1,
    },
  })
  return {
    ...product.toJSON(),
    ...data[0],
  }
}

const calculateFromOrder = async (list) => {
  await Promise.all(list.map(async (item) => {
    const result = await ProductModel.findByIdAndUpdate(item.product, {
      $inc: { 'statistic.ordered': item.quantity },
    })
    return result
  }))
}

export default {
  updateById,
  newDoc,
  findByCondition,
  countByCondition,
  fake,
  briefInfo,
  briefInfoById,
  getDetail,
  calculateFromOrder,
  updateDoc,
}
