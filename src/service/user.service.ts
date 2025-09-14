import prisma from "../libs/prisma";
import type { UserType, GetAllUserOptions } from "../interface/userinterface";

class UserService {
  /**
   * Save a new user to the database
   * @param user - UserType object containing user details
   * @returns The created user object
   */
  async saveUser(user: UserType) {
    try {
      const savedUser = await prisma.user.create({
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
        },
      });
      return savedUser;
    } catch (error) {
      console.error("Save User Error:", error);
      return null;
    }
  }

  /**
   * Find a user by their email
   * @param email - The email of the user to find
   * @returns The user object if found, otherwise null
   */
  async findUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Find User By Email Error:", error);
      return null;
    }
  }

  /**
   * Find a user by their ID
   * @param id - The ID of the user
   * @returns The user object if found, otherwise null
   */
  async findUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error("Find User By ID Error:", error);
      return null;
    }
  }

  /**
   * Get a paginated list of users with optional search and role filters
   * @param options - Pagination, search, and role options
   * @returns An object containing users, total count, current page, and total pages
   */
  
  async getAllUser({ page = 1, limit = 10, search = "", role }: GetAllUserOptions) {
    try {
      const skip = (page - 1) * limit;
  
      const where: any = {};
  
      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }
  
      if (role) {
        where.role = role;
      }
  
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: "desc" },
        }),
        prisma.user.count({ where }),
      ]);
  
      return {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error("Get All Users Error:", error);
      return null;
    }
  }

  /**
   * Update an existing user
   * @param id - The ID of the user to update
   * @param update - Partial object with fields to update
   * @returns The updated user object
   */
  async updateUser(id: string, update: Partial<UserType>) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: update,
      });
      return updatedUser;
    } catch (error) {
      console.error("Update User Error:", error);
      return null;
    }
  }

  /**
   * Delete a user by ID
   * @param id - The ID of the user to delete
   * @returns The deleted user object
   */
  async deleteUser(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      console.error("Delete User Error:", error);
      return null;
    }
  }

  async makeUserAdmin(id: string) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { role: "ADMIN" },
      });
      return updatedUser;
    } catch (error) {
      console.error("Make User Admin Error:", error);
      return null;
    }
  }
}

export default UserService;
