import express from 'express';
import WishlistController from '../controller/wishlist.Controller';
import { authenticateUserToken } from '../middleware/validatorusertoken';

const wishlistRouter = express.Router();

const wishlistController = new WishlistController();

// Protect routes with auth middleware
wishlistRouter.use(authenticateUserToken);

// Add product to wishlist
wishlistRouter.post('/add', wishlistController.addToWishlist.bind(wishlistController));

// Remove product from wishlist
wishlistRouter.delete('/:productId', wishlistController.removeFromWishlist.bind(wishlistController));

// Get user's wishlist
wishlistRouter.get('/', wishlistController.getUserWishlist.bind(wishlistController));

export default wishlistRouter;