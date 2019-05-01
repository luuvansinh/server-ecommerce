import { CartModel, ProductModel } from '../../model';
import { to } from '../../utils';
import dbQuery from './query'

const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CartModel.findOne(query))
  return data
}

const newDoc = async (data) => {
  const doc = new CartModel(data)
  const result = await to(doc.save())
  return result
}

const updateDoc = async (cart, data) => {
  Object.assign(cart, data)
  const result = await to(cart.save())
  return result
}

const updateById = async (_id, payload, options = {}) => {
  const result = await to(CartModel.updateOne({ _id }, payload, options))
  return result
}

const addProduct = async (user, product, isIncreament = true) => {
  let cart = await findOneByCondition({ user })
  if (!cart) {
    cart = new CartModel({ user })
  }
  const index = cart.list.findIndex(item => item.product.toString() === product)
  if (index > -1) {
    // eslint-disable-next-line no-unused-expressions
    isIncreament ? cart.list[index].quantity++ : cart.list[index].quantity--
  } else {
    cart.list.push({
      product,
      quantity: 1,
    })
  }
  const result = await to(cart.save())
  return result
}

const deleteProduct = async (user, product) => {
  const cart = await findOneByCondition({ user })
  if (!cart) {
    return { error: null }
  }
  cart.list = cart.list.filter(item => item.product.toString() !== product)
  const result = await to(cart.save())
  return result
}

const briefInfo = async (cart) => {
  const list = await Promise.all(cart.list.map(async (item) => {
    const obj = await ProductModel.briefInfoById(item.product)
    return {
      ...obj,
      quantity: item.quantity,
    }
  }))
  return {
    list,
  }
}

export default {
  newDoc,
  findOneByCondition,
  updateDoc,
  updateById,
  addProduct,
  deleteProduct,
  briefInfo,
}
