import configs from '../configs'

/**
 * Get message from error object
 *
 * @param {Object}  error
 */
const message = (error) => {
  let msg = configs.message.serverError
  if (!error) {
    return msg
  }
  if (error.message) {
    return error.message
  }

  if (error.name === 'MongoError' || error.name === 'BulkWriteError') {
    if (error.code === 11000) {
      msg = configs.message.dataExisted
    }
  } else if (error.errors) {
    msg = error.errors[Object.keys(error.errors)[0]]
      ? error.errors[Object.keys(error.errors)[0]].message
      : msg
  }
  return msg
}

export default {
  message,
}
