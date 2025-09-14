import OrderController from "../controller/order.Controller";
import express from "express";
import { validator } from "../middleware/validator";
import { createOrderSchema } from "../schema/orderWishlistValidation";
import { authenticateUserToken } from "../middleware/validatorusertoken";
const orderRouter = express.Router();

const orderController = new OrderController();

// Protect routes with auth middleware
orderRouter.use(authenticateUserToken);

// Order Routes
orderRouter.post('/', [validator(createOrderSchema)],orderController.createOrder.bind(orderController));

orderRouter.get('/', orderController.getUserOrders.bind(orderController));

export default orderRouter;