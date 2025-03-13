import { Request, Response } from "express";
import { CreatePublicationLike } from "../../application/createPublicationLike";

export class PublicationLikeController {
  constructor(private createPublication: CreatePublicationLike) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const {publicationId, userId} = req.body;

      const publication = await this.createPublication.run(publicationId, userId);

      res.status(200).json({ message: "Like success", publication });
    } catch (error) {
      const err = error as Error;

      res.status(400).json({
        message: "Error al dar like",
        error: err.message,
      });
      
    }
  }
}
