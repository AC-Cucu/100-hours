// const exppress = require("express");
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Product from './models/product.model.js'

dotenv.config()

const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())

app.get('/api/products', (request, response) => {})
app.post('/api/products', async (request, response) => {
  const product = request.body // user will send product data in the request body
  if (!product.name && !product.price && !product.image) {
    response.status(400).json({ succes: false, message: 'Invalid product data, please provide all the fields' })
  }

  // create a new product instance
  const newProduct = new Product(product)
  try {
    // save the product to the database
    await newProduct.save()
    response.status(201).json({ success: true, message: 'Product created successfully', data: product })
  } catch (error) {
    console.error('Error creating product:', error)
    response.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.delete('/api/products/:id', async (request, response) => {
  const { id } = request.params
  console.log('Deleting product with ID:', id)

  try {
    await Product.findByIdAndDelete(id)
    response.status(200).json({ success: true, message: 'Product deleted successfully', data: id })
  } catch (error) {
    console.error('Error deleting product:', error)
    response.status(404).json({ success: false, message: 'Product not found' })
  }
})

app.listen(5000, () => {
  connectDB()
  console.log('Server started at http://localhost:5000')
})
