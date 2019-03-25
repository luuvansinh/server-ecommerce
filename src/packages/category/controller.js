import { response, getError } from '../../utils'
import { CategoryModel } from '../../model'

const create = async (req, res) => {
  const { error } = await CategoryModel.newDoc(req.body)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

export default {
  create,
}
