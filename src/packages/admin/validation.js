import Joi from 'joi'
import { validateClientData } from '../../utils'
import configs from '../../configs'

const { message } = configs
const product = {
  name: Joi.string().required().options({
    language: {
      key: '{{!name}}',
      any: {
        required: `!!${message.productNameRequired}`,
        empty: `!!${message.productNameRequired}`,
      },
    },
  }),
  price: Joi.number().required().options({
    language: {
      key: '{{!price}}',
      any: {
        required: `!!${message.productPriceRequired}`,
        empty: `!!${message.productPriceRequired}`,
      },
    },
  }),
  quantity: Joi.number().required().options({
    language: {
      key: '{{!quantity}}',
      any: {
        required: `!!${message.productQuantityRequired}`,
        empty: `!!${message.productQuantityRequired}`,
      },
    },
  }),
}

const category = {
  name: Joi.string().required().options({
    language: {
      key: '{{!name}}',
      any: {
        required: `!!${message.categoryNameRequired}`,
        empty: `!!${message.categoryNameRequired}`,
      },
    },
  }),
}

const order = {
  status: Joi.string().required().options({
    language: {
      key: '{{!status}}',
      any: {
        required: `!!${message.statusRequired}`,
        empty: `!!${message.statusRequired}`,
      },
    },
  }),
}

const createProduct = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(product))
}

const createCategory = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(category))
}

const changeOrderStatus = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(order))
}

export default {
  createProduct,
  createCategory,
  changeOrderStatus,
}
