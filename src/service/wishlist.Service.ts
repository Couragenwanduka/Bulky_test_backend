import prisma from "../libs/prisma";

class WishlistService {

  /**
   * Add a product to the user's wishlist
   * @param userId - ID of the authenticated user
   * @param productId - ID of the product to add
   * @returns The created or existing wishlist item
   */
  async addToWishlist(userId: string, productId: string) {
    try {
      // Use upsert to either create a new wishlist entry or do nothing if it already exists
      return prisma.wishlist.upsert({
        where: { userId_productId: { userId, productId } }, // Unique constraint on userId + productId
        create: { userId, productId }, // Create a new wishlist entry if it does not exist
        update: {}, // Do nothing if it already exists
      });
    } catch (error) {
      console.log("Add to wishlist error:", error); // Log any errors
    }
  }

  /**
   * Remove a product from the user's wishlist
   * @param userId - ID of the authenticated user
   * @param productId - ID of the product to remove
   * @returns The deleted wishlist item
   */
  async removeFromWishlist(userId: string, productId: string) {
    try {
      // Delete the wishlist item based on the unique userId + productId constraint
      return prisma.wishlist.delete({
        where: { userId_productId: { userId, productId } },
      });
    } catch (error) {
      console.log("Remove from wishlist error:", error); // Log any errors
    }
  }

  /**
   * Get all wishlist items for a user
   * @param userId - ID of the authenticated user
   * @returns List of wishlist items with related product details
   */
  async getUserWishlist(userId: string) {
    try {
      // Retrieve all wishlist items for the user and include product details
      return prisma.wishlist.findMany({
        where: { userId },
        include: { product: true },
      });
    } catch (error) {
      console.log("Get wishlist error:", error); // Log any errors
    }
  }
}

export default WishlistService;
