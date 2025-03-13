import type { IJWT } from "./interfaces/IJWT.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JWT implements IJWT{
    async sign(payload: string): Promise<string> {
        console.log('>>>>>>', String(process.env.JWT_SECRET));
        
        return jwt.sign({data: payload}, String(process.env.JWT_SECRET), {expiresIn: '2h'});
    }

    verify(token: string): JwtPayload {
        const newToken: string = token?.startsWith('Bearer ') ? token.slice(7) : token;
        return jwt.verify(newToken, 'secret') as JwtPayload;
    }
}