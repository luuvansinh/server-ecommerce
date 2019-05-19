import { CategoryModel, ProductModel, OrderModel, UserModel } from '../../model'
import { getError, response } from '../../utils'

const limit = 20

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
    products: await ProductModel.findByCondition(req.query, { page, limit }, sort),
    limitPerPage: limit,
    total: await ProductModel.countByCondition(req.query),
  }])
  data[0].products = await Promise.all(data[0].products.map(async (item) => {
    const obj = await ProductModel.briefInfo(item)
    return obj
  }))
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
  const product = await ProductModel.getDetail(productData)
  return response.r200(res, { product })
}

const uploadCovers = async (req, res) => {
  const { error } = await ProductModel.updateById(req.productData._id, {
    $push: { covers: req.file.filename },
  })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res, {})
}


// Orders
const allOrders = async (req, res) => {
  const { page = 0, sort } = req.query
  const data = await Promise.all([{
    orders: await OrderModel.findByCondition(req.query, { page, limit }, sort),
    total: await OrderModel.countByCondition(req.query),
    limit,
  }])

  data[0].orders = await Promise.all(data[0].orders.map(async (order) => {
    const obj = await OrderModel.briefInfo(order)
    return obj
  }))

  return response.r200(res, data[0])
}

const changeOrderStatus = async (req, res) => {
  const { orderData, body: { status } } = req
  const { error } = await OrderModel.updateDoc(orderData, { status })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res)
}

const orderChart = async (req, res) => {
  const data = await OrderModel.getDataForChart(req.query)
  response.r200(res, { chart: data })
}

/**
 * Users
 */

const userAll = async (req, res) => {
  const { page = 0, sort } = req.query

  const data = await Promise.all([{
    users: await UserModel.findByCondition(req.query, { page, limit }, sort),
    total: await UserModel.countByCondition(req.query),
    limitPerPage: limit,
  }])

  const result = data[0]

  result.users = await Promise.all(result.users.map(async (item) => {
    const obj = await UserModel.briefInfo(item)
    return obj
  }))

  return response.r200(res, result)
}

const userChangeStatus = async (req, res) => {
  const { error } = await UserModel.updateDoc(req.userData, {
    active: !req.userData.active,
  })
  if (error) {
    return response.r400(res, getError.message(error))
  }
  return response.r200(res)
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
  allOrders,
  changeOrderStatus,
  orderChart,
  userAll,
  userChangeStatus,
}
