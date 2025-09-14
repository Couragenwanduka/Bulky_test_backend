import Joi from "joi";

// Order validation
export const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).min(1).required(),
  status: Joi.string().valid("pending", "completed", "cancelled").default("pending"),
});

// Wishlist validation
export const addToWishlistSchema = Joi.object({
  productId: Joi.string().required(),
});

export const removeFromWishlistSchema = Joi.object({
  productId: Joi.string().required(),
});
