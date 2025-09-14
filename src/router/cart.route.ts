import express from "express";
import CartController from "../controller/cart.Controller";
import { authenticateUserToken } from "../middleware/validatorusertoken";
import { validator } from "../middleware/validator";
import { addToCartSchema, updateCartItemSchema, removeCartItemSchema } from "../schema/cart.joi";

const cartRouter = express.Router();
const cartController = new CartController();

// Protect routes with auth middleware
cartRouter.use(authenticateUserToken);

cartRouter.post("/add",  [validator(addToCartSchema)],cartController.addToCart.bind(cartController));
cartRouter.get("/", cartController.getCart.bind(cartController));
cartRouter.put("/update",  [validator(updateCartItemSchema)],cartController.updateCartItem.bind(cartController));
cartRouter.delete("/remove/:cartItemId", [validator(removeCartItemSchema)],cartController.removeCartItem.bind(cartController));

export default cartRouter;
