// import lodash from 'lodash'
import response from './response'
import format from './format'
import validation from './validation'
import {
  UserModel, CategoryModel, ProductModel, OrderModel,
} from '../model'
import configs from '../configs';

function query(req, res, next, _id, Model, errorKey) {
  if (!validation.isObjectId(_id)) {
    return response.r404(res, errorKey)
  }

  // Find
  Model.findOne({ _id }, (error, doc) => {
    if (error || !doc) {
      return response.r404(res, errorKey)
    } else {
      req[`${format.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

const user = (req, res, next, _id) => {
  query(req, res, next, _id, UserModel, configs.message.userNotFound)
}

const category = (req, res, next, _id) => {
  query(req, res, next, _id, CategoryModel, configs.message.categoryNotFound)
}

const product = (req, res, next, _id) => {
  query(req, res, next, _id, ProductModel, configs.message.productNotFound)
}

const order = (req, res, next, _id) => {
  query(req, res, next, _id, OrderModel, configs.message.orderNotFound)
}


// Export
export default {
  user,
  category,
  product,
  order,
}
