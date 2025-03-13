import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader?.split(" ")[1];

  try {
    const newToken: string = token?.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(newToken, process.env.JWT_SECRET as string);
    
    req.userId = decoded as string;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
