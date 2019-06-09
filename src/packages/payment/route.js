import express from 'express'
import controller from './controller'
import middleware from '../system/middleware'

const router = express.Router()

router.post('/', middleware.requiresLogin, controller.paymentSuccess)

export default router
