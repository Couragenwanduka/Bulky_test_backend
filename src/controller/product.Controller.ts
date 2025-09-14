import type { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../error/successResponse";
import BadRequest from "../error/error";
import ProductService from "../service/product.service";
import type { ProjectInterface } from "../interface/projectinterface";

class ProductController {
    productService: ProductService;

    constructor() {
        // Initialize ProductService instance
        this.productService = new ProductService();
    }

    /**
     * Create a new product
     * @param req - Express request object containing product data in req.body
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productData: ProjectInterface = req.body;
            const newProduct = await this.productService.createProduct(productData);

            if (!newProduct) throw new BadRequest("Product creation failed");

            // Send success response with created product
            sendSuccess({
                res,
                data: newProduct,
                message: "Product created successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all products with pagination and optional filters
     * @param req - Express request object containing query params:
     *  - page: current page number
     *  - limit: number of items per page
     *  - search: search keyword for name/description
     *  - category: product category filter
     *  - minPrice, maxPrice: price range filter
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            // Parse query parameters with defaults
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || "";
            const category = (req.query.category as string) || undefined;
            const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
            const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

            // Fetch products with filters and pagination
            const result = await this.productService.getAllProducts({ page, limit, search, category, minPrice, maxPrice });
            if (!result) throw new BadRequest("Unable to fetch products");

            // Send paginated result
            sendSuccess({
                res,
                data: result,
                message: "Products fetched successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get a single product by ID
     * @param req - Express request object containing product ID in req.params
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) throw new BadRequest("Product not found");

            sendSuccess({
                res,
                data: product,
                message: "Product retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update an existing product
     * @param req - Express request object containing product ID in req.params and update data in req.body
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updateData: Partial<ProjectInterface> = req.body;
            const updatedProduct = await this.productService.updateProduct(id, updateData);
            if (!updatedProduct) throw new BadRequest("Product update failed");

            sendSuccess({
                res,
                data: updatedProduct,
                message: "Product updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a product by ID
     * @param req - Express request object containing product ID in req.params
     * @param res - Express response object
     * @param next - Express next function for error handling
     */
    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedProduct = await this.productService.deleteProduct(id);
            if (!deletedProduct) throw new BadRequest("Product deletion failed");

            sendSuccess({
                res,
                data: deletedProduct,
                message: "Product deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
