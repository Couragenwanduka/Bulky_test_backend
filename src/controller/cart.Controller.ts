import { Request, Response, NextFunction } from "express";
import CartService from "../service/cart.Service";
import { sendSuccess } from "../error/successResponse";
import BadRequest from "../error/error";

class CartController {
  cartService: CartService;

  constructor() {
    // Initialize the CartService to interact with cart-related database operations
    this.cartService = new CartService();
  }

  /**
   * Add a product to the user's cart
   * @param req - Express Request object containing productId and quantity in the body
   * @param res - Express Response object
   * @param next - Express NextFunction for error handling
   */
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity } = req.body;
      const userId = (req as any).user?.id; // Get user ID from authenticated request

      if (!userId) {
        // Throw error if user is not authenticated
        throw new BadRequest('User not authenticated');
      }

      // Add product to the cart via CartService
      const cartItem = await this.cartService.addToCart(userId, productId, quantity);

      // Send success response with the added cart item
      sendSuccess({ res, data: cartItem, message: "Item added to cart" });
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  }

  /**
   * Get all cart items for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      // Fetch all cart items for the user
      const cartItems = await this.cartService.getUserCart(userId);

      // Send success response with cart items
      sendSuccess({ res, data: cartItems, message: "Cart retrieved successfully" });
    } catch (error) {
      next(error); // Pass errors to middleware
    }
  }

  /**
   * Update the quantity of a cart item
   * @param req - Express Request object containing cartItemId and quantity
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId, quantity } = req.body;

      // Update cart item quantity via CartService
      const updatedItem = await this.cartService.updateCartItem(cartItemId, quantity);

      // Send success response with updated cart item
      sendSuccess({ res, data: updatedItem, message: "Cart item updated" });
    } catch (error) {
      next(error); // Pass errors to middleware
    }
  }

  /**
   * Remove a specific item from the user's cart
   * @param req - Express Request object containing cartItemId in params
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async removeCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId } = req.params;

      // Remove cart item via CartService
      await this.cartService.removeCartItem(cartItemId);

      // Send success response confirming removal
      sendSuccess({ res, message: "Cart item removed", data: '' });
    } catch (error) {
      next(error); // Pass errors to middleware
    }
  }
}

export default CartController;
