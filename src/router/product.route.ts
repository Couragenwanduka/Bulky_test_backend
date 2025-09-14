import express from 'express';
import { authenticateToken } from '../middleware/validatorToken';
import ProductController from '../controller/product.Controller';
import { createProductSchema, updateProductSchema, getAllProductsSchema } from '../schema/product.joi';
import { validator } from '../middleware/validator';

const productRouter = express.Router();

const productController = new ProductController();

// Create Product
productRouter.post('/', authenticateToken,[validator(createProductSchema)] ,productController.createProduct.bind(productController));

// Get All Products
productRouter.get('/',  productController.getAllProducts.bind(productController));

// Get Product by ID
productRouter.get('/:id',  [validator(getAllProductsSchema)], productController.getProductById.bind(productController)); 

// Update Product
productRouter.put('/:id', authenticateToken, [validator(updateProductSchema)], productController.updateProduct.bind(productController));

// Delete Product
productRouter.delete('/:id', authenticateToken, productController.deleteProduct.bind(productController));

export default productRouter;