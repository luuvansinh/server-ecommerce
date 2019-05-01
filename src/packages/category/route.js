/**
 * Category routes
 * prefix: /categories
 */

import express from 'express'
import CategoryCtrl from './controller'
import { preQuery } from '../../utils';

const router = express.Router()


router.post('/', CategoryCtrl.create)

router.get('/', CategoryCtrl.getAll)

router.get('/:categoryId', CategoryCtrl.show)

router.param('categoryId', preQuery.category)

export default router
