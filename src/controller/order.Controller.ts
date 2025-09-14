import { Request, Response, NextFunction } from "express";
import OrderService from "../service/order.Service";
import { sendSuccess } from "../error/successResponse";
import BadRequest from "../error/error";
import ProductService from "../service/product.service";
import CartService from "../service/cart.Service";

class OrderController {
  orderService: OrderService;
  productService: ProductService;
  cartService: CartService;

  constructor() {
    this.orderService = new OrderService();
    this.productService = new ProductService();
    this.cartService = new CartService();
  }

  /**
   * Create a new order for the authenticated user
   * @param req - Express Request object containing `items`, `total`, and optional `status` in the body
   * @param res - Express Response object
   * @param next - Express NextFunction for error handling
   */
async createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new BadRequest("User not authenticated");

    const { items, status } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new BadRequest("Order items are required");
    }

    // Calculate total by fetching products from DB
    let total = 0;
    const validatedItems: {
      productId: string;
      quantity: number;
      price: number;
      subtotal: number;
      stock: number; // keep stock snapshot
    }[] = [];

    for (const item of items) {
      const product = await this.productService.getProductById(item.productId);
      if (!product) {
        throw new BadRequest(`Product with id ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequest(
          `Not enough stock for product ${product.name} (available: ${product.stock})`
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      validatedItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // store price snapshot
        subtotal: itemTotal,
        stock: product.stock, // keep current stock
      });
    }

    // Save the order
    const order = await this.orderService.createOrder(
      userId,
      validatedItems,
      total,
      status
    );

    // Update product stock sequentially (await properly)
    for (const item of validatedItems) {
        await this.productService.updateProduct(item.productId, {
      stock: item.stock - item.quantity,
    });

    }
    await this.cartService.clearCart(userId); 

    sendSuccess({ res, data: order, message: "Order created successfully" });
  } catch (error) {
    next(error);
  }
}


  /**
   * Retrieve all orders for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction for error handling
   */
  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id; 
      if (!userId) throw new BadRequest("User not authenticated"); 

      // Fetch orders from the service
      const orders = await this.orderService.getUserOrders(userId);

      // Send success response with retrieved orders
      sendSuccess({ res, data: orders, message: "Orders retrieved successfully" });
    } catch (error) {
      next(error); 
    }
  }
}

export default OrderController;
