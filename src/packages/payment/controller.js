import { PaymentModel } from '../../model';
import { response, getError } from '../../utils';

const paymentSuccess = async (req, res) => {
  const { error } = await PaymentModel.newDoc({
    ...req.body,
    user: req.user._id,
  })
  if (error) {
    return response.r400(res, getError.message(error))
  }

  return response.r200(res)
}

export default {
  paymentSuccess,
}
