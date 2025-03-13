import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateDto =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = Object.values(error.format()).flatMap((error) =>
          Array.isArray(error) ? error : error["_errors"] ?? []
        );

        res.status(400).json({
          message: "Error de validación",
          errors: formattedErrors,
        });
      }

      next(error);
    }
  };
