import prisma from "../libs/prisma";
import type { OrderItem } from "../interface/orderinterface";

class OrderService {

  /**
   * Create a new order for a user
   * @param userId - ID of the user placing the order
   * @param items - Array of order items, each containing productId, quantity, and price
   * @param total - Total price of the order
   * @param status - Status of the order (default is "pending")
   * @returns Created order with order items included
   */
  async createOrder(userId: string, items: { productId: string; quantity: number; price: number; subtotal: number }[], total: number, status = "pending") {
    try {
      // Create the order in the database and also create associated order items
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          status,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.subtotal,
            })),
          },
        },
        include: { items: true }, // Include created order items in the response
      });

      return order;
    } catch (error) {
      console.log("Order creation error:", error); // Log any errors during creation
    }
  }

  /**
   * Retrieve all orders for a specific user
   * @param userId - ID of the user
   * @returns Array of orders with their items and product details, sorted by creation date
   */
  async getUserOrders(userId: string) {
    try {
      return prisma.order.findMany({
        where: { userId },
        include: { 
          items: { 
            include: { product: true } // Include full product details for each order item
          } 
        },
        orderBy: { createdAt: "desc" }, // Most recent orders first
      });
    } catch (error) {
      console.log("Get orders error:", error); // Log errors during retrieval
    }
  }

  /**
   * Retrieve a single order by its ID
   * @param orderId - ID of the order
   * @returns The order with its items and product details
   */
  async getOrderById(orderId: string) {
    try {
      return prisma.order.findUnique({
        where: { id: orderId },
        include: { 
          items: { 
            include: { product: true } // Include product details for each item
          } 
        },
      });
    } catch (error) {
      console.log("Get order error:", error); // Log errors during retrieval
    }
  }
}

export default OrderService;
