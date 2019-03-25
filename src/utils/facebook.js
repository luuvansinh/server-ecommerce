import request from 'request-promise'
import config from '../configs'

/**
 * Handle request data
 *
 * @param {Object} option option for request
 */
const requestData = (option = {}) => {
  return request(option).then((response) => {
    return response
  }).catch((error) => {
    return error.error.error
  })
}

/**
 * Fetch token from code
 *
 * @param {string} code code from client
 */
const fetchUserAccessTokenFromCode = async (code) => {
  const appAccessToken = ['AA', config.accountKit.appId, config.accountKit.secret].join('|')
  const option = {
    url: config.endPoints.exchangeToken,
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
    },
    qs: {
      grant_type: 'authorization_code',
      code,
      access_token: appAccessToken,
    },
  }
  const body = await requestData(option)
  if (body.code) {
    return body.code
  }
  return body.access_token
}

/**
 * Fetch phone number from token
 * @param {string} token token of user
 */
const fetchUserPhoneFromCode = async (code) => {
  const data = await fetchUserAccessTokenFromCode(code)
  if (typeof data === 'number' && data < 200) {
    return { error: config.message.invalidFBAuthCode }
  }
  const option = {
    url: config.endPoints.accountKit,
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
    },
    qs: {
      access_token: data,
    },
  }
  const body = await requestData(option)
  if (body.phone) {
    return { phone: body.phone.number, error: null }
  }
  return { phone: '' }
}

export default {
  fetchUserPhoneFromCode,
}
