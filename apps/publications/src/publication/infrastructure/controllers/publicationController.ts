import { Request, Response } from "express";
import { CreatePublication } from "../../application/createPublication";

export class PublicationController {
  constructor(private createPublication: CreatePublication) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const {title, content, userId} = req.body;

      const publication = await this.createPublication.run(title, content, userId);

      res.status(200).json({ message: "Publicación creada", publication });
    } catch (error) {
      const err = error as Error;

      res.status(400).json({
        message: "Error al crear la publicación",
        error: err.message,
      });
      
    }
  }
}
