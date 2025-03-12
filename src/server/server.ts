import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(express.json());
  }

  public start() {
    const PORT = process.env.PORT || 3030;
    this.app.listen(PORT, () => {
      console.log(`Server running. Port: ${PORT}`);
    });
  }
}
