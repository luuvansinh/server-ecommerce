import Joi from 'joi'
import { validateClientData } from '../../utils'
import configs from '../../configs'

const { message } = configs
const obj = {
  code: Joi.string().required().options({
    language: {
      key: '{{!code}}',
      any: {
        required: `!!${message.codeRequired}`,
        empty: `!!${message.codeRequired}`,
      },
    },
  }),
}

const login = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(obj))
}

export default {
  login,
}
