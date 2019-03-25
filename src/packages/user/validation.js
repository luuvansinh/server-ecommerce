/*
import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'

const obj = {
  isLocalExpert: Joi.boolean().required().options({
    language: {
      key: '{{!isLocalExpert}}',
      boolean: {
        base: `!!${localesKey.user.invalidLocalExpert}`,
      },
      any: {
        required: `!!${localesKey.user.invalidLocalExpert}`,
      },
    },
  }),
}

const changeLocalExpert = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['isLocalExpert'])))
}

export default {
  changeLocalExpert,
}
*/
