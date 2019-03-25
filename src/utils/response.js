/* eslint-disable prefer-destructuring */
import HttpStatus from 'http-status-codes'
import configs from '../configs'

const { success, invalidParams, noPermission, dataNotFound, serverError } = configs.message

/**
 * Response data with status code 200 (OK)
 *
 * @param {Object} res response object from nodejs
 * @param {Object} data return data
 * @param {String} message
 */
const r200 = (res, data = {}, message = success) => {
  return res.status(HttpStatus.OK).jsonp({
    data,
    message,
  })
}

/**
 * Response data with status code 400 (BAD REQUEST)
 *
 * @param {Object} res response object from nodejs
 * @param {String} message
 */
const r400 = (res, message = invalidParams) => {
  return res.status(HttpStatus.BAD_REQUEST).jsonp({
    message,
    data: {},
  })
}

/**
 * Response data with status code 401 (UNAUTHORIZED)
 *
 * @param {Object} res response object from nodejs
 * @param {String} message
 */
const r401 = (res, message = noPermission) => {
  return res.status(HttpStatus.UNAUTHORIZED).jsonp({
    message,
    data: {},
  })
}

/**
 * Response data with status code 404 (NOT FOUND)
 *
 * @param {Object} res response object from nodejs
 * @param {String} message
 */
const r404 = (res, message = dataNotFound) => {
  return res.status(HttpStatus.NOT_FOUND).jsonp({
    message,
    data: {},
  })
}

/**
 * Response data with status code 500 (SERVER ERROR)
 *
 * @param {Object} res response object from nodejs
 */
const r500 = (res) => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).jsonp({
    message: serverError,
    data: {},
  })
}

/**
 * Return response if validation params error
 *
 * @param  {Object}   res response object
 * @param  {Object}   error error object
 */
const validation = (res, error) => {
  let message = configs.message.invalidParams

  if (error && error.details) {
    message = error.details[0].message
  }

  return res.status(HttpStatus.BAD_REQUEST).jsonp({ message, data: {} })
}

export default {
  r200,
  r400,
  r401,
  r404,
  r500,
  validation,
}
