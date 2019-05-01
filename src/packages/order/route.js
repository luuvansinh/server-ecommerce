import express from 'express'
import controller from './controller'
import middleware from '../system/middleware'
import validation from './validation';
import { preQuery } from '../../utils';

const router = express.Router()

router.post('/', middleware.requiresLogin, validation.order, controller.order)

router.patch('/:orderId', controller.cancel)

router.param('orderId', preQuery.order)

export default router
