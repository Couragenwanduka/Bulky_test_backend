import { Request, Response, NextFunction } from "express";
import WishlistService from "../service/wishlist.Service";
import { sendSuccess } from "../error/successResponse";
import BadRequest from "../error/error";
import ProductService from "../service/product.service";

class WishlistController {
  wishlistService: WishlistService;
  productService: ProductService;

  constructor() {
    // Initialize WishlistService to handle wishlist-related database operations
    this.wishlistService = new WishlistService();
    // Initialize ProductService to fetch product details for wishlist items
    this.productService = new ProductService();
  }

  /**
   * Add a product to the authenticated user's wishlist
   * @param req - Express Request object containing `productId` in the body
   * @param res - Express Response object
   * @param next - Express NextFunction for error handling
   */
  async addToWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const { productId } = req.body; 

      if (!userId) throw new BadRequest("User not authenticated");

      const product = await this.productService.getProductById(productId);
      if (!product) throw new BadRequest("Product not found");

      // Add product to wishlist via WishlistService
      const wishlistItem = await this.wishlistService.addToWishlist(userId, productId);

      // Send success response with newly added wishlist item
      sendSuccess({ res, data: wishlistItem, message: "Item added to wishlist" });
    } catch (error) {
      next(error); // Pass errors to Express error-handling middleware
    }
  }

  /**
   * Remove a product from the authenticated user's wishlist
   * @param req - Express Request object containing `productId` in params
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const { productId } = req.params; 

      // Remove product from wishlist via WishlistService
      await this.wishlistService.removeFromWishlist(userId, productId);

      // Send success response confirming removal
      sendSuccess({ res, data: '', message: "Item removed from wishlist" });
    } catch (error) {
      next(error); // Pass errors to middleware
    }
  }

  /**
   * Retrieve all wishlist items for the authenticated user
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction
   */
  async getUserWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id; 

      // Fetch wishlist items via WishlistService
      const wishlist = await this.wishlistService.getUserWishlist(userId);

      // Send success response with retrieved wishlist items
      sendSuccess({ res, data: wishlist, message: "Wishlist retrieved successfully" });
    } catch (error) {
      next(error); // Pass errors to middleware
    }
  }
}

export default WishlistController;
