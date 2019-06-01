import { response, getError } from '../../utils';
import { OrderModel } from '../../model';

const order = async (req, res) => {
  const { error } = await OrderModel.newDoc(req.body, req.user._id)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  response.r200(res)
}

const cancel = async (req, res) => {
  const { error } = await OrderModel.updateDoc(req.orderData, {
    status: 'canceled',
  })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  response.r200(res)
}

const getAll = async (req, res) => {
  const { page = 0, sort } = req.query
  const limit = 10
  const condition = { ...req.query, user: req.user._id }
  const data = await Promise.all([{
    orders: await OrderModel.findByCondition(condition, { page, limit }, sort),
    total: await OrderModel.countByCondition(condition),
    limit,
  }])

  data[0].orders = await Promise.all(data[0].orders.map(async (item) => {
    const obj = await OrderModel.briefInfo(item)
    return obj
  }))
  response.r200(res, data[0])
}

export default {
  order,
  cancel,
  getAll,
}
