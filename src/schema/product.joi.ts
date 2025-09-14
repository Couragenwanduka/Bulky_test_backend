import Joi from "joi";

// -------------------------
// Schema for creating a product
// -------------------------
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.array().required()
  // Add more fields if your ProjectInterface has them
});

// -------------------------
// Schema for updating a product
// All fields are optional, because user may update any subset
// -------------------------
export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().precision(2).positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  imageUrl: Joi.array().optional()
});

// -------------------------
// Schema for pagination & filters
// -------------------------
export const getAllProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  search: Joi.string().max(100).optional(),
  category: Joi.string().max(50).optional(),
  minPrice: Joi.number().precision(2).positive().optional(),
  maxPrice: Joi.number().precision(2).positive().optional(),
}).with("minPrice", "maxPrice"); // optional, but if minPrice exists, maxPrice should exist too
