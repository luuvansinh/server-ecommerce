/**
 * Category routes
 * prefix: /categories
 */

import express from 'express'
import CartCtrl from './controller'
import middleware from '../system/middleware'
// import validation from './validation'

const router = express.Router()


router.get('/', middleware.requiresLogin, CartCtrl.all)

router.post('/', middleware.requiresLogin, CartCtrl.addCart)

router.delete('/:productId', CartCtrl.remove)

export default router
