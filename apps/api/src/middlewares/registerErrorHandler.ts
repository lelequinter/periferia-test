import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const registerErrorHandler = (err: any, req: Request, res: Response) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(400).json({
          message: "El correo ya se encunetra registrado.",
          field: err.meta?.target,
        });

      case "P2025":
        return res.status(404).json({
          message: "No se encontró el recurso en la base de datos.",
        });

      default:
        return res.status(500).json({
          message: "Error en la base de datos",
          error: err.code,
        });
    }
  }

  return res.status(500).json({
    message: "Error interno del servidor",
    error: err.message,
  });
};
