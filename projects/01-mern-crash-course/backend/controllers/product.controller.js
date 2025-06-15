import mongoose from 'mongoose'

import Product from '../models/product.model.js'

export const getAllProducts = async (request, response) => {
  try {
    // Fetch all products from the database
    const products = await Product.find()

    // Send the products as a JSON response
    response.status(200).json({ success: true, message: 'Products fetched successfully', data: products })
  } catch (error) {
    console.error('Error fetching products:', error)
    response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const getProductById = async (request, response) => {
  const { id } = request.params
  try {
    const product = await Product.findById(id)

    // Send the product as a JSON response
    response.status(200).json({ success: true, message: 'Product fetched successfully', data: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const updatedProductById = async (request, response) => {
  try {
    const { id } = request.params
    const product = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ success: false, message: 'Invalid product ID' })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })

    // Send the updated product as a JSON response
    response.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct })
  } catch (error) {
    console.error('Error updating product:', error.message)
    response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const createProduct = async (request, response) => {
  // user will send product data in the request body
  const product = request.body

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
    console.error('Error creating product:', error.message)
    response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const deleteProductById = async (request, response) => {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ success: false, message: 'Invalid product ID' })
  }

  console.log('Deleting product with ID:', id)

  try {
    await Product.findByIdAndDelete(id)
    response.status(200).json({ success: true, message: 'Product deleted successfully', data: id })
  } catch (error) {
    console.error('Error deleting product:', error.message)
    response.status(404).json({ success: false, message: 'Product not found' })
  }
}
// This code defines the product controller functions for a RESTful API using Express.js and Mongoose.
