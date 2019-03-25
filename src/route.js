/**
 * App router bootstrap
 */

import { Router } from 'express'

export default () => {
  const api = Router()

  // Authenticate with token
  api.use('*', require('./packages/system/authentication').default)

  // Mount components
  api.use('/', require('./packages/common/route').default)
  api.use('/users', require('./packages/user/route').default)
  api.use('/me', require('./packages/me/route').default)
  api.use('/categories', require('./packages/category/route').default)
  api.use('/admin', require('./packages/admin/route').default)
  // Return
  return api
}