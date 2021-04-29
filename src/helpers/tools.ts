import jwt from "jsonwebtoken";

export const dasherizeCamelCase = (word: string) =>
  word.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();

export const generateJWTToken = (data: object) =>
  jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

export const decodeJWTToken = (token: string) =>
  token && jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);

export const pagination = (page: any = { size: 15, number: 1 }) => ({
  limit: parseInt(page.size),
  offset: parseInt(page.size) * (parseInt(page.number) - 1),
});
export const totalPage = (count, size = 15) => Math.ceil(count / size);
