import { OrderModel, CartModel, ProductModel, UserModel } from '../../model';
import { to, format } from '../../utils';
import dbQuery from './query'
import configs from '../../configs';

const TIME_ZONE = 7 * 60 * 60 * 1000

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
    await Promise.all([
      await CartModel.updateOne({ user }, {
        $set: { list: [] },
      }),
      await ProductModel.calculateFromOrder(doc.list),
      await UserModel.updateStatistic(user, doc),
    ])
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

const findByCondition = async (condition, { page, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(OrderModel.find(query).skip(page * limit).limit(limit).sort(sort).lean())
  return data
}

const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(OrderModel.countDocuments(query))
  return data
}

const briefInfo = async (order) => {
  const data = await Promise.all([{
    user: await UserModel.briefById(order.user),
    list: await Promise.all(order.list.map(async (item) => {
      const product = await ProductModel.getBaseInfo(item.product)
      return {
        ...item,
        ...product,
      }
    })),
  }])

  return {
    ...order,
    ...data[0],
  }
}

const getDataForChart = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const data = await OrderModel.aggregate([{
    $match: query,
  }, {
    $project: {
      year: { $year: { $add: ['$createdAt', TIME_ZONE] } },
      month: { $month: { $add: ['$createdAt', TIME_ZONE] } },
      day: { $dayOfMonth: { $add: ['$createdAt', TIME_ZONE] } },
      createdAt: 1,
    },
  }, {
    $group: {
      _id: { year: '$year', month: '$month', day: '$day' },
      createdAt: { $first: '$createdAt' },
      total: { $sum: 1 },
    },
  }, {
    $sort: {
      createdAt: 1,
    },
  }])
  const result = format.convertStatisticData(data, condition.startAt, condition.endAt, 'createdAt')
  return result
}

export default {
  newDoc,
  updateDoc,
  getHistories,
  findByCondition,
  countByCondition,
  briefInfo,
  getDataForChart,
}
