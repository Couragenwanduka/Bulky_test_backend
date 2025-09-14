import type { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../error/successResponse";
import BadRequest from "../error/error";
import UserService from "../service/user.service";
import bcrypt from "../utils/bcrypt";
import token from "../utils/token";
import type { UserType } from "../interface/userinterface";

class UserController {
    userService: UserService
    constructor() {
        this.userService = new UserService()
    }

    /**
     * Create a new user
     * @param req Express Request object
     * @param res Express Response object
     * @param next Express NextFunction
     */
    async createUser (req:Request, res:Response, next:NextFunction){
        try{
            const { firstName, lastName, email, password } = req.body;

            console.log(firstName, lastName, email, password)
    
            // Check if user already exists
            const existingUser = await this.userService.findUserByEmail(email);
            if(existingUser)  throw new BadRequest("User already exists");
    
            // Hash password
            const hashedPassword = await bcrypt.hashPassword(password);
            if (!hashedPassword) throw new Error("Password hashing failed");
    
            // Save user
            const savedUser = await this.userService.saveUser({
                firstName,
                lastName,
                email,
                password:hashedPassword
            })
    
            if (!savedUser) throw new Error("Failed to save user");
    
            // Generate JWT token
            const payload = {
                id: savedUser.id,
                email: savedUser.email
            }
            const generatedToken = await token.generateToken(payload);
    
             // Omit password
            const { password: _, ...userWithoutPassword } = savedUser;
            // await this.userService.makeUserAdmin(savedUser.id)
            sendSuccess({
                res,
                data:{
                    user: userWithoutPassword,
                    token: generatedToken
                },
                message: "User created successfully",
            })
        }catch(error){
            next(error)
        }
    }
    /**
     * login user 
     * @param req 
     * @param res 
     * @param next 
     */

    async login (req:Request, res:Response, next:NextFunction){
        try{
            const { email, password } = req.body;

             // Check if user already exists
            const existingUser = await this.userService.findUserByEmail(email);
            if(!existingUser) throw new BadRequest("Unauthorized");

            const isMatch = await bcrypt.comparePassword(password, existingUser.password);
            if(!isMatch) throw new BadRequest("Unauthorized");

             // Generate JWT token
            const payload = {
                id: existingUser.id,
                email: existingUser.email
            }
            const generatedToken = await token.generateToken(payload);

             // Omit password
            const { password: _, ...userWithoutPassword } = existingUser;

            sendSuccess({
                res,
                data:{
                    user: userWithoutPassword,
                    token: generatedToken
                },
                message: "User logged in successfully",
            })

        }catch(error){
            next(error)
        }
    }

     /**
     * Get all users with pagination, search, and role filter
     * @param req Express Request object
     * @param res Express Response object
     * @param next Express NextFunction
     */

    async getUser (req:Request, res:Response, next:NextFunction){
        try{
             const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || "";
            const role = (req.query.role as string) || undefined;

            const result = await this.userService.getAllUser({ page, limit, search, role });

            if (!result) throw new BadRequest("Unable to fetch users");

            // Remove password from each user
            const usersWithoutPassword = result.users.map((user: UserType) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            sendSuccess({
                res,
                data: {
                    users: usersWithoutPassword,
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages
                },
                message: "Users fetched successfully",
            });

        }catch(error){
            next(error)
        }
    }

    /**
   * Update a user by ID
   * @param req - Express Request
   * @param res - Express Response
   * @param next - Express NextFunction
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData: Partial<UserType> = req.body;

      const updatedUser = await this.userService.updateUser(id!, updateData);

      if (!updatedUser) throw new BadRequest("User not found or update failed");

      // Omit password
      const { password: _, ...userWithoutPassword } = updatedUser;

      sendSuccess({
        res,
        data: userWithoutPassword,
        message: "User updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

   /**
   * Delete a user by ID
   * @param req - Express Request
   * @param res - Express Response
   * @param next - Express NextFunction
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedUser = await this.userService.deleteUser(id!);

      if (!deletedUser) throw new BadRequest("User not found or deletion failed");

      // Omit password
      const { password: _, ...userWithoutPassword } = deletedUser;

      sendSuccess({
        res,
        data: userWithoutPassword,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Make a user admin by ID
   * @param req - Express Request
   * @param res - Express Response
   * @param next - Express NextFunction
   */
  async makeUserAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const updatedUser = await this.userService.makeUserAdmin(id!);

      if (!updatedUser) throw new BadRequest("User not found or update failed");

      // Omit password
      const { password: _,...userWithoutPassword } = updatedUser;

      sendSuccess({
        res,
        data: userWithoutPassword,
        message: "User made admin successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController