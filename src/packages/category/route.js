/**
 * Category routes
 * prefix: /categories
 */

import express from 'express'
import CategoryCtrl from './controller'
// import validation from './validation'

const router = express.Router()


router.post('/', CategoryCtrl.create)

export default router
