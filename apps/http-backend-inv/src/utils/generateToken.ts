import jwt from "jsonwebtoken";



export const generateToken = (userId: string) => {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};