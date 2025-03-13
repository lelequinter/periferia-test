import { Request, Response } from "express";
import { GetPublications } from "../../application/getPublications";

export class GetPublicationController {
  constructor(private getPublications: GetPublications) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const publication = await this.getPublications.run();

      res.status(200).json({ message: "Publicaciones obtenidas", publication });
    } catch (error) {
      const err = error as Error;

      res.status(400).json({
        message: "Error al crear la publicación",
        error: err.message,
      });
      
    }
  }
}
