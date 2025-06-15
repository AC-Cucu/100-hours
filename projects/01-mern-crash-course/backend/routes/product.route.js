import express from 'express'

import { getAllProducts, getProductById, updatedProductById, createProduct, deleteProductById } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', createProduct)

router.patch('/:id', updatedProductById)

router.delete('/:id', deleteProductById)

export default router
// This code defines the product routes for a RESTful API using Express.js.
