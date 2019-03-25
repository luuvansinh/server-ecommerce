/**
 * API authentication
 */
import express from 'express'
import { verify } from 'jsonwebtoken'
import configs from '../../configs'
import { response } from '../../utils'

const router = express.Router()

// List fields will cast to number by default
const NUMERIC_FIELDS = ['page', 'limit']
const BOOLEAN_FIELDS = ['verified', 'active', 'isLocalExpert', 'isAll', 'status', 'starred', 'isUsed']
const WHITE_LIST = [
  '/login-web-with-phone-number',
]

router.use((req, res, next) => {
  // Cast all number in query data to number type instead of string
  for (const key in req.query) {
    /* eslint eqeqeq:[0] */
    if (NUMERIC_FIELDS.indexOf(key) !== -1 && req.query[key] == Number(req.query[key])) {
      req.query[key] = Number(req.query[key])
    }
  }

  // Cast all boolean in query data to boolean type instead of string
  for (const key in req.query) {
    if (BOOLEAN_FIELDS.indexOf(key) !== -1 && req.query[key] == Boolean(req.query[key] == 'true').toString()) {
      req.query[key] = Boolean(req.query[key] == 'true')
    }
  }

  // Get locale to client

  // Skip check token for white list api
  if (WHITE_LIST.includes(req.baseUrl)) {
    // If no token found, user is consider as not authenticated
    return next()
  }

  // Check header for token
  // Use body instead, due to photon not allow header
  const token = req.headers.authorization

  // Decode token
  if (token) {
    // Verifies secret and checks exp
    verify(token.split(' ')[1], configs.secret, (error, decoded) => {
      if (error) {
        console.log('*** decode token error', error)
        return response.r401(res, configs.message.tokenVerifyFailed)
      }

      // If everything is good, save to request for use in other stuffs
      if (typeof decoded === 'string') {
        decoded = JSON.parse(decodeURIComponent(decoded))
      }

      req.user = decoded
      next()
    })
  } else {
    // If no token found, user is consider as not authenticated
    next()
  }
})

export default router
