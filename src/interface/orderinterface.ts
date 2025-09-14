

export interface OrderItemType {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number; // calculated subtotal for each item
}

export interface OrderItem {
  productId: any;
  quantity: any;
  price: any;
  subtotal: any; // calculated subtotal for each item
  id: string;
  userId: string;
  items: OrderItemType[]; // Array of products in the order
  total: number;
  status: "pending" | "completed" | "cancelled"; // match your enum/status values
  createdAt: Date;
}
