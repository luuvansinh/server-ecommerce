/**
 * Common routes
 * prefix: /
 */

import express from 'express'
import CommonCtrl from './controller'
import validation from './validation'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {post} /login-web-with-phone-number Login web with phone number
 * @apiGroup Common
 * @apiName LoginWebWithPhoneNumber
 *
 * @apiParam {String} code Facebook authentication code from client
 */
router.post('/login-web-with-phone-number', validation.login, CommonCtrl.loginWebWithPhoneNumber)

router.post('/register', validation.register, CommonCtrl.register)

router.post('/login', validation.publicLogin, CommonCtrl.login)

export default router
