import { response, getError } from '../../utils'
import { CategoryModel } from '../../model'

const create = async (req, res) => {
  const { error } = await CategoryModel.newDoc(req.body)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const getAll = async (req, res) => {
  const categories = await CategoryModel.find({ active: true }).lean()
  return response.r200(res, { categories })
}

const show = async (req, res) => {
  const category = await CategoryModel.getDetail(req.params.categoryId)
  response.r200(res, { category })
}

export default {
  create,
  getAll,
  show,
}
