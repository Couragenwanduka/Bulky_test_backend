export interface ProjectInterface {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string[];
}

export interface GetAllProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}