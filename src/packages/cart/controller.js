import { CartModel } from '../../model';
import { response, getError } from '../../utils';

const all = async (req, res) => {
  let cart = await CartModel.findOneByCondition({ user: req.user._id })
  cart = await CartModel.briefInfo(cart)
  return response.r200(res, { list: cart.list })
}

const addCart = async (req, res) => {
  const { error } = await CartModel.addProduct(req.user._id, req.body.product)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res)
}

const remove = async (req, res) => {
  const { error } = await CartModel.deleteProduct(req.user._id, req.params.productId)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res)
}

export default {
  all,
  addCart,
  remove,
}
