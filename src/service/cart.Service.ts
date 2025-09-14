import prisma from "../libs/prisma";

class CartService {

    /**
     * Add a product to the user's cart
     * @param userId - ID of the user
     * @param productId - ID of the product to add
     * @param quantity - Number of items to add
     */
    async addToCart(userId: string, productId: string, quantity: number) {
        try {
            // Check if the user already has this product in their cart
            const existingCartItem = await prisma.cartItem.findFirst({
                where: { userId, productId },
            });

            if (existingCartItem) {
                // Update the quantity if the product is already in the cart
                await prisma.cartItem.update({
                    where: { id: existingCartItem.id },
                    data: { quantity: existingCartItem.quantity + quantity },
                });
            } else {
                // Create a new cart item if the product is not yet in the cart
                await prisma.cartItem.create({
                    data: { userId, productId, quantity },
                });
            }
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    }

    /**
     * Update the quantity of a cart item
     * @param cartItemId - ID of the cart item
     * @param quantity - New quantity
     * @returns Updated cart item
     */
    async updateCartItem(cartItemId: string, quantity: number) {
        try {
            return prisma.cartItem.update({
                where: { id: cartItemId },
                data: { quantity },
            });
        } catch (error) {
            console.log("Error updating cart item:", error);
        }
    }

    /**
     * Remove a cart item
     * @param cartItemId - ID of the cart item to remove
     * @returns Deleted cart item
     */
    async removeCartItem(cartItemId: string) {
        try {
            return prisma.cartItem.delete({
                where: { id: cartItemId },
            });
        } catch (error) {
            console.log("Error removing cart item:", error);
        }
    }

    /**
     * Get all cart items for a specific user
     * @param userId - ID of the user
     * @returns Array of cart items with product details
     */
    async getUserCart(userId: string) {
        try {
            return prisma.cartItem.findMany({
                where: { userId },
                include: { product: true }, // Include product details for each cart item
            });
        } catch (error) {
            console.log("Error fetching user cart:", error);
        }
    }

    /**
     * Clear all cart items for a specific user
     * @param userId - ID of the user
     * @returns Result of deletion
     */
    async clearCart(userId: string) {
        try {
            return prisma.cartItem.deleteMany({
                where: { userId },
            });
        } catch (error) {
            console.log("Error clearing cart:", error);
        }
    }

}

export default CartService;
