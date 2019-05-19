import express from 'express'
import controller from './controller'
import { preQuery } from '../../utils'
import validation from './validation'
import UploadModule from '../../modules/upload'
import middleware from '../system/middleware'

const router = express.Router()

/**
 * Category
 */

router.post('/categories', validation.createCategory, controller.createCategory)

router.get('/categories', controller.allCategories)

router.patch('/categories/:categoryId/change-status', controller.changeStatusCategory)

router.put('/categories/:categoryId', validation.createCategory, controller.updateCategory)

router.param('categoryId', preQuery.category)

/**
 * Product
 */

router.post('/products', validation.createProduct, controller.createProduct)

router.get('/products', controller.getAllProducts)

router.get('/products/:productId', controller.detailProduct)

router.put('/products/:productId', validation.createProduct, controller.updateProduct)

router.patch('/products/:productId/change-status', controller.changeStatusProduct)

router.patch('/products/:productId/covers', UploadModule.uploadImage('file'), controller.uploadCovers)

router.param('productId', preQuery.product)

/**
 * Orders
 */

router.get('/orders', middleware.requiresAdmin, controller.allOrders)

router.patch('/orders/:orderId/change-status', middleware.requiresAdmin, validation.changeOrderStatus, controller.changeOrderStatus)

router.get('/orders/chart', middleware.requiresAdmin, controller.orderChart)

router.param('orderId', preQuery.order)

export default router
