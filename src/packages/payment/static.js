import { PaymentModel } from '../../model';
import { to } from '../../utils';

const newDoc = async (data) => {
  const doc = new PaymentModel(data)
  const result = await to(doc.save())
  return result
}

export default {
  newDoc,
}
