import express from 'express'
import ProductCtrl from './controller'
import { preQuery } from '../../utils';

const router = express.Router()

router.get('/', ProductCtrl.all)

router.get('/:productId', ProductCtrl.show)

router.param('productId', preQuery.product)

export default router
