import faker from 'faker/locale/vi'
import { ProductModel } from '../../model'
import { to } from '../../utils';
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
    // console.log({ item })
    await newDoc(item)
  })
}

// const updateCovers = async (product, )

export default {
  updateById,
  newDoc,
  findByCondition,
  countByCondition,
  fake,
}
