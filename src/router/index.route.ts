import express from 'express';
import userRouter from './user.route';
import productRouter from './product.route';
import wishlistRouter from './wishlist.route';
import orderRouter from './order.route';
import cartRouter from './cart.route';
import uploadRouter from './upload.route';


const router = express.Router();

// User Routes
router.use('/user', userRouter);

// Product Routes
router.use('/product', productRouter);

// Wishlist Routes
router.use('/wishlist', wishlistRouter);

// Order Routes
router.use('/order', orderRouter);

// Cart Routes
router.use('/cart', cartRouter);

// Upload Routes
router.use('/upload', uploadRouter);

export default router;