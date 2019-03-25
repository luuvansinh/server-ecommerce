import { CategoryModel, ProductModel } from '../../model'
import { getError, response } from '../../utils'

const LIMIT = 20

/**
 * Category section
 */

const createCategory = async (req, res) => {
  const { error } = await CategoryModel.newDoc(req.body)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const allCategories = async (req, res) => {
  const categories = await CategoryModel.findByCondition({})
  return response.r200(res, { categories })
}

const changeStatusCategory = async (req, res) => {
  const { categoryData } = req
  const { error } = await CategoryModel.updateById(categoryData._id, { $set: { active: !categoryData.active } })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const updateCategory = async (req, res) => {
  const { error } = await CategoryModel.updateById(req.params.categoryId, { $set: req.body })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}


/**
 * Product section
 */

const createProduct = async (req, res) => {
  const { error } = await ProductModel.newDoc(req.body)
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const getAllProducts = async (req, res) => {
  const { page = 0, sort = '-createdAt' } = req.query
  const data = await Promise.all([{
    products: await ProductModel.findByCondition(req.query, { page, LIMIT }, sort),
    limitPerPage: LIMIT,
    total: await ProductModel.countByCondition(req.query),
  }])
  return response.r200(res, data[0])
}

const updateProduct = async (req, res) => {
  const { error } = await ProductModel.updateById(req.params.productId, { $set: req.body })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const changeStatusProduct = async (req, res) => {
  const { productData } = req
  const { error } = await ProductModel.updateById(productData._id, { $set: { active: !productData.active } })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}

const detailProduct = async (req, res) => {
  const { productData } = req
  // await ProductModel.fake()
  return response.r200(res, { product: productData })
}

const uploadCovers = async (req, res) => {
  // const { error } = await ProductModel.updateById(req.productData._id, })
  return response.r200(res, {})
}

export default {
  createCategory,
  allCategories,
  changeStatusCategory,
  updateCategory,
  createProduct,
  updateProduct,
  getAllProducts,
  changeStatusProduct,
  detailProduct,
  uploadCovers,
}
