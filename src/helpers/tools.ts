import jwt from "jsonwebtoken";

export const dasherizeCamelCase = (word: string) =>
  word.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();

export const generateJWTToken = (data: object) =>
  jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

export const decodeJWTToken = (token: string) =>
  token && jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
