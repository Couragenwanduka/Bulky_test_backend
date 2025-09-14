import bcrypt from "bcryptjs";

/**
 * Hash a plain text password
 * @param password - The plain password to hash
 * @returns The hashed password
 */
const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10; // number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("HashPassword error:", error);
    return '';
  }
};

/**
 * Compare plain text password with hashed Password
 * @param password - Plain password
 * @param hashPassword   - Hashed password
 * @returns  boolean
 */

const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    try{
        const isMatch = await bcrypt.compare(password, hashPassword)
        return isMatch
    }catch(error){
        console.error("Compare Password Error", error)
        return false

    }
}

export default { hashPassword, comparePassword }
