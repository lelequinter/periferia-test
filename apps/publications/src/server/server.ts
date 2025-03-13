import express, { Application } from "express";
import dotenv from "dotenv";
import publicationsRouter from "../publication/publicationRouter";
import publicationLikesRouter from "../publication-likes/publicationLikeRouter";

declare global {
  namespace Express {
      interface Request {
          userId: string
      }
  }
}

dotenv.config();

export class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api/publications", publicationsRouter);
    this.app.use("/api/publication-likes", publicationLikesRouter);
  }

  public start() {
    const PORT = process.env.PORT || 3031;
    this.app.listen(PORT, () => {
      console.log(`Server running OK on Port: ${PORT}`);
    });
  }
}

export const app = new Server().app;
