import config from '../configs'
import { mongoose } from './mongoose'

/**
 * Check string is ObjectId or not
 */
const isObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

/**
 * Check string is email or not
 */
const isEmail = (email) => {
  return config.regex.email.test(email)
}

/**
 * Check string is boolean or not
 */
const isBoolean = (bool) => {
  return typeof bool === 'boolean'
}

// Export
export default {
  isObjectId,
  isEmail,
  isBoolean,
}
