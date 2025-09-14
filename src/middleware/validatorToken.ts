import UserService from "../service/user.service";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import BadRequest from "../error/error";


interface JwtPayload {
  id: string;
  email: string;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const userService = new UserService();

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new BadRequest("Token missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    if (!token) throw new BadRequest("Token missing");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not defined in environment");

    const decoded = jwt.verify(token, secret) as JwtPayload;
 
    const existingUser = await userService.findUserByEmail(decoded.email);
    if (!existingUser) throw new BadRequest("Unauthorized: Invalid token");

    if(existingUser.role !== "ADMIN"){
        throw new BadRequest("Unauthorized: User not admin");
    }

    req.user = decoded; // attach payload to request

    next(); // proceed to next middleware or route handler
  } catch (error) {
    next(new BadRequest("Unauthorized: Invalid token"));
  }
};