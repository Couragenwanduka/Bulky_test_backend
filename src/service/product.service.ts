import prisma from "../libs/prisma";
import { ProjectInterface, GetAllProductsOptions } from "../interface/projectinterface";

class ProductService {

    /**
     * Create a new product in the database
     * @param product - The product object containing all required fields
     * @returns The newly created product object
     */
    async createProduct(product: ProjectInterface) {
        try {
            // Use Prisma to create a new product record in the database
            const newProduct = await prisma.product.create({
                data: product
            });
            return newProduct;
        } catch (error) {
            // Log error if creation fails
            console.log('Product creation error: ' + error);
        }
    }

    /**
     * Fetch all products with pagination, search, and optional filters
     * @param options - Object containing pagination, search, category, and price range filters
     * @returns An object containing products array, total count, current page, and total pages
     */
    async getAllProducts({ page = 1, limit = 10, search = '', category, minPrice, maxPrice }: GetAllProductsOptions) {
        try {
            // Calculate how many records to skip based on page number
            const skip = (page - 1) * limit;

            // Initialize filter object
            const where: any = {};

            // Search filter by name or description (case-insensitive)
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ];
            }

            // Filter by category if provided
            if (category) {
                where.category = category;
            }

            // Filter by price range if minPrice or maxPrice provided
            if (minPrice !== undefined || maxPrice !== undefined) {
                where.price = {};
                if (minPrice !== undefined) where.price.gte = minPrice; // Greater than or equal
                if (maxPrice !== undefined) where.price.lte = maxPrice; // Less than or equal
            }

            // Fetch products and total count in parallel for efficiency
            const [products, total] = await Promise.all([
                prisma.product.findMany({
                    where,
                    skip,
                    take: limit, // Limit number of results per page
                    orderBy: { createdAt: "desc" }, // Sort newest first
                }),
                prisma.product.count({ where }), // Total products matching filters
            ]);

            return {
                products,
                total,
                page,
                totalPages: Math.ceil(total / limit), // Calculate total pages
            };
        } catch (error) {
            console.error("Get All Products Error:", error);
            return null;
        }
    }

    /**
     * Retrieve a single product by its ID
     * @param id - Product ID
     * @returns The product object if found, else null
     */
    async getProductById(id: string) {
        try {
            const product = await prisma.product.findUnique({
                where: { id },
            });
            return product;
        } catch (error) {
            console.log('Product retrieval error: ' + error);
        }
    }

    /**
     * Update a product by ID
     * @param id - Product ID
     * @param updateData - Partial object containing fields to update
     * @returns The updated product object
     */
    async updateProduct(id: string, updateData: Partial<ProjectInterface>) {
        try {
            const updatedProduct = await prisma.product.update({
                where: { id },
                data: updateData,
            });
            return updatedProduct;
        } catch (error) {
            console.log('Product update error: ' + error);
        }
    }

    /**
     * Delete a product by ID
     * @param id - Product ID
     * @returns The deleted product object
     */
    async deleteProduct(id: string) {
        try {
            const deletedProduct = await prisma.product.delete({
                where: { id },
            });
            return deletedProduct;
        } catch (error) {
            console.log('Product deletion error: ' + error);
        }
    }
}

export default ProductService;
