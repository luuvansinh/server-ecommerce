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

export default {
  order,
  cancel,
}
