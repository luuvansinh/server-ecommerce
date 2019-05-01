import Joi from 'joi'
import { validateClientData } from '../../utils'
import configs from '../../configs'

const { message } = configs
const obj = {
  address: Joi.string().required().options({
    language: {
      key: '{{!addresss}}',
      any: {
        required: `!!${message.addresssRequired}`,
        empty: `!!${message.addresssRequired}`,
      },
    },
  }),
  phone: Joi.string().required().options({
    language: {
      key: '{{!phone}}',
      any: {
        required: `!!${message.phoneRequired}`,
        empty: `!!${message.phoneRequired}`,
      },
    },
  }),
  name: Joi.string().required().options({
    language: {
      key: '{{!name}}',
      any: {
        required: `!!${message.nameRequired}`,
        empty: `!!${message.nameRequired}`,
      },
    },
  }),
  list: Joi.array().items(Joi.object().keys({
    product: Joi.string().regex(configs.regex.objectId).options({
      language: {
        key: '{{!product}}',
        string: {
          regex: {
            base: `!!${message.invalidObjectId}`,
          },
        },
      },
    }),
    quantity: Joi.number().min(1).required().options({
      language: {
        key: '{{!product}}',
        number: {
          base: `!!${message.quantityMustBeANumber}`,
          min: `!!${message.quantityMustBeANumber}`,
        },
      },
    }),
  })),
}

const order = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(obj))
}


export default {
  order,
}
