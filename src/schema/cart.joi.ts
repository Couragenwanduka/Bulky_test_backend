import Joi from "joi";

// Validation for adding a product to the cart
export const addToCartSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product ID is required"
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required"
  })
});

// Validation for updating a cart item
export const updateCartItemSchema = Joi.object({
  cartItemId: Joi.string().required().messages({
    "string.empty": "Cart item ID is required",
    "string.cuid": "Cart item ID must be a valid cuid"
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required"
  })
});

// Validation for removing a cart item
export const removeCartItemSchema = Joi.object({
  cartItemId: Joi.string().required().messages({
    "string.empty": "Cart item ID is required",
    "string.cuid": "Cart item ID must be a valid cuid"
  })
});
