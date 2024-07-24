import jwt, { JwtPayload } from "jsonwebtoken";

export function getDataFromToken(token: string) {
  const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  return tokenData.id;
}
