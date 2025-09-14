import { Request, Response, NextFunction } from "express";
import { uploadMultipleToCloudinary } from "../utils/cloudinary";
import BadRequest from "../error/error";
import { sendSuccess } from "../error/successResponse";

/**
 * Upload profile picture(s) for authenticated user
 * @param req - Express Request object containing file(s)
 * @param res - Express Response object
 * @param next - Express NextFunction for error handling
 */
export async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new BadRequest("User not authenticated");

    // Handle single or multiple uploads
    const files = (req.files as Express.Multer.File[]) || 
                  (req.file ? [req.file as Express.Multer.File] : []);

    if (!files || files.length === 0) {
      throw new BadRequest("No file(s) provided");
    }

    // Extract Buffers
    const buffers = files.map((file) => file.buffer);

    // Upload to Cloudinary
    const cloudinaryResults = await uploadMultipleToCloudinary(buffers, "Product Images");

    sendSuccess({
      res,
      data: cloudinaryResults,
      message: files.length > 1 
        ? "Images uploaded successfully" 
        : "Image uploaded successfully"
    });
  } catch (error) {
    next(error);
  }
}
