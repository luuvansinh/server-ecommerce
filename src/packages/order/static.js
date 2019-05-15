import { OrderModel, CartModel, ProductModel } from '../../model';
import { to } from '../../utils';
import dbQuery from './query'
import configs from '../../configs';

const newDoc = async (data, user) => {
  const cart = await CartModel.findOneByCondition({ user })
  if (!cart.list.length) {
    return { error: { message: configs.message.cartEmpty } }
  }
  const productIds = cart.list.map(({ product }) => product)
  const products = await ProductModel.find({
    _id: {
      $in: productIds,
    },
  }, { price: 1, discountPercent: 1 })
  // get total price
  const total = products.reduce((value, currentValue, index) => {
    const actually = currentValue.price - (currentValue.price * currentValue.discountPercent / 100)
    return value + actually * cart.list[index].quantity
  }, 0)
  cart.list = await Promise.all(cart.list.map(async (item, index) => {
    const product = products[index]
    const productDetail = await ProductModel.findById(product._id)
    const price = productDetail.getPrice()
    return {
      ...item,
      price,
    }
  }))
  const doc = new OrderModel({
    ...data,
    list: cart.list,
    user,
    total: Math.round(total),
  })
  const result = await to(doc.save())
  if (!result.error) {
    await CartModel.updateOne({ user }, {
      $set: { list: [] },
    })
    await ProductModel.calculateFromOrder(doc.list)
  }
  return result
}

const updateDoc = async (doc, data) => {
  Object.assign(doc, data)
  const result = await to(doc.save())
  return result
}

const getHistories = async (user) => {
  const query = dbQuery.findByCondition({ user })
  const { data } = await to(OrderModel.find(query).lean())
  const orders = await Promise.all(data.map(async (order) => {
    order.list = await Promise.all(order.list.map(async (item) => {
      const product = await ProductModel.getBaseInfo(item.product)
      return {
        ...item,
        ...product,
      }
    }))
    return order
  }))
  return orders
}

export default {
  newDoc,
  updateDoc,
  getHistories,
}
