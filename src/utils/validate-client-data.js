import Joi from 'joi'
import response from './response'

/**
 * Validate body data from client
 */
export default (req, res, next, schema) => {
  const data = ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
  const { error } = Joi.validate(data, schema, {
    allowUnknown: true,
  })

  if (error) {
    // Response
    return response.validation(res, error)
  }
  next()
}
