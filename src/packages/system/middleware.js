/**
 * API middleware
 */
import configs from '../../configs'
import { response, to, validation } from '../../utils'
import { ObjectId } from '../../utils/mongoose'
import { UserModel } from '../../model'


/**
 * ****************************************
 * COUNT IN DATABASE
 * ****************************************
 */

/**
 * Count in database
 */
const modelCountInDb = async (model, _id, role) => {
  if (!validation.isObjectId(_id)) {
    return false
  }

  // Setup count condition
  const condition = {
    _id: new ObjectId(_id),
  }

  if (role) {
    condition['admin.role'] = role
  }

  const { data } = await to(model.countDocuments(condition))

  return data
}

/**
 * ****************************************
 * CHECK ROLE
 * ****************************************
 */

/**
 * Check valid token
 */
const isAuthenticated = async (req) => {
  const isExists = await modelCountInDb(UserModel, req.user._id)
  return isExists
}

/**
 * Check role admin
 */
const isAdmin = async (req) => {
  const isRoleAdmin = await modelCountInDb(UserModel, req.user._id, configs.roles.admin)
  return isRoleAdmin
}

/**
 * Check is editor
 */
const isEditor = async (req) => {
  const isValid = await modelCountInDb(UserModel, req.user._id, configs.roles.editor)
  return isValid
}


/**
 * ****************************************
 * REQUIRE
 * ****************************************
 */

/**
 * Require user logged in to do next action
 *
 */
const requiresLogin = async (req, res, next) => {
  const isAuthorized = await isAuthenticated(req)
  if (!isAuthorized) {
    return response.r401(res, configs.message.requireAuth)
  }
  next()
}

/**
 * Require admin role to do next action
 */
const requiresAdmin = async (req, res, next) => {
  const [isLoggedIn, isRoleAdmin] = await Promise.all([
    await isAuthenticated(req),
    await isAdmin(req),
  ])
  if (!isLoggedIn || !isRoleAdmin) {
    return response.r401(res, configs.message.noPermission)
  }
  next()
}

/**
 * Require editor role to do next action
 *
 */
const requiresEditor = async (req, res, next) => {
  const [isLoggedIn, isRoleAdmin, isRoleEditor] = await Promise.all([
    await isAuthenticated(req),
    await isAdmin(req),
    await isEditor(req),
  ])

  if (!isLoggedIn || (!isRoleAdmin && !isRoleEditor)) {
    return response.r401(res, configs.message.noPermission)
  }
  next()
}

// Export
export default {
  requiresLogin,
  requiresEditor,
  requiresAdmin,
}
