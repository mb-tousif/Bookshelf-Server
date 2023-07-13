import jwt, { JwtPayload } from "jsonwebtoken";
import Config from "../Config";

export const getUserInfoFromToken = (token: string): JwtPayload => {
    const decodedToken = jwt.verify(token, Config.jwt.secret as string) as JwtPayload;
    return decodedToken;
}