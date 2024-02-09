import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { accessExpDate, refreshExpDate, secretKey, appName } from "../configs/constant";

export interface User {
  id: string;
  username: string;
}

export function generateAccessJWT(user: User): string | null {
  try {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const options: SignOptions = {
      expiresIn: accessExpDate,
      algorithm: "HS256",
      issuer: appName,
      jwtid: String(user.id),
      subject: user.username,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  } catch (err: any) {
    console.error("Error generating JWT:", err.message);
    return null;
  }
}

export function generateRefreshJWT(user: User): string | null {
  try {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const options: SignOptions = {
      expiresIn: refreshExpDate,
      algorithm: "HS256",
      issuer: appName,
      jwtid: String(user.id),
      subject: user.username,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  } catch (err: any) {
    console.error("Error generating JWT:", err.message);
    return null;
  }
}
export function decodeJWT(token: string): any {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken ? decodedToken.payload : null;
  } catch (err: any) {
    console.error("Error decoding JWT:", err.message);
    return null;
  }
}

export function validateJWT(token: string, user: any): User | null {
  try {
    const options: VerifyOptions = {
      algorithms: ["HS256"],
      issuer: appName,
      jwtid: String(user.userId),
      subject: user.username,
    };
    const decodedToken = jwt.verify(token, secretKey, options) as User;

    return decodedToken;
  } catch (err: any) {
    console.error("Error validating JWT:", err.message);
    return null;
  }
}
