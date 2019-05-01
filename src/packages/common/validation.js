import lodash from 'lodash'
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
  email: Joi.string().required().options({
    language: {
      key: '{{!email}}',
      any: {
        required: `!!${message.emailRequired}`,
        empty: `!!${message.emailRequired}`,
      },
    },
  }),
  password: Joi.string().required().options({
    language: {
      key: '{{!password}}',
      any: {
        required: `!!${message.passowrdREquired}`,
        empty: `!!${message.passowrdREquired}`,
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
}

const login = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['code'])))
}

const register = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['email', 'phone', 'password', 'name'])))
}

const publicLogin = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['email', 'password'])))
}

export default {
  login,
  register,
  publicLogin,
}
