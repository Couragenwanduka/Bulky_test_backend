import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token
 * @param payload - Object containing user id and email
 * @returns JWT token as string
 */
const generateToken = async (payload: { id: string; email: string }): Promise<string | null> => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    // Sign token, e.g., expires in 1 day
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  } catch (error) {
    console.error("Generate Token Error:", error);
    return null;
  }
};


export default { generateToken}
