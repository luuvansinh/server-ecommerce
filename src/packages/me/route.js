/**
 * Me routes
 * prefix: /me
 */

import express from 'express'
import MeCtrl from './controller'
import middleware from '../system/middleware'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /me Get current user info
 * @apiGroup Me
 * @apiName Get current user info
 */
router.get('/', middleware.requiresLogin, MeCtrl.currentUserInfo)

export default router
