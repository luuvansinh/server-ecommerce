/**
 * Users routes
 * prefix: /users
 */

import express from 'express'
import middleware from '../system/middleware'
import UserCtrl from './controller'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /users All users
 * @apiGroup User
 * @apiName All Users
 *
 * @apiParam {Number} page
 * @apiParam {String} keyword
 * @apiParam {String} city
 */
router.get('/', middleware.requiresAdmin, UserCtrl.all)

// Middleware
router.param('userId', preQuery.user)

export default router
