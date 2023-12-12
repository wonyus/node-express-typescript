import bcrypt from "bcrypt";

const saltRounds = 10; // Number of salt rounds for bcrypt. Higher is better but slower.

// Function to encrypt a password using bcrypt
export async function encryptPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err: any) {
    // Handle any error that might occur during password encryption
    console.error("Error encrypting:", err.message);
    throw err;
  }
}

export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err: any) {
    // Handle any error that might occur during password validation
    console.error("Error validating:", err.message);
    throw err;
  }
}
