import { OrderModel, CartModel, ProductModel } from '../../model';
import { to } from '../../utils';

const newDoc = async (data, user) => {
  const cart = await CartModel.findOneByCondition({ user })
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
  cart.list = cart.list.map((item, index) => {
    const product = products[index]
    const price = product.price - (product.price * product.discountPercent / 100)
    return {
      ...item,
      price,
    }
  })
  const doc = new OrderModel({
    ...data,
    list: cart.list,
    user,
    total: Math.round(total),
  })
  const result = await to(doc.save())
  if (!result.error) {
    await CartModel.update({ user }, {
      $set: { list: [] },
    })
  }
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
}
