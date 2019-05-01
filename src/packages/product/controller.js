import { response } from '../../utils';
import { ProductModel } from '../../model';
import configs from '../../configs';

const all = async (req, res) => {
  const { page = 0, sort = '-createdAt' } = req.query
  const limit = configs.limit.product.all
  const condition = { ...req.query, status: true }
  const data = await Promise.all([{
    products: await ProductModel.findByCondition(condition, { page, limit }, sort),
    total: await ProductModel.countByCondition(condition),
    limit,
  }])
  const result = data[0]
  result.products = await Promise.all(result.products.map(async (item) => {
    const obj = await ProductModel.briefInfo(item)
    return obj
  }))
  return response.r200(res, data[0])
}

const show = async (req, res) => {
  const product = await ProductModel.getDetail(req.productData)
  return response.r200(res, { product })
}

export default {
  all,
  show,
}
