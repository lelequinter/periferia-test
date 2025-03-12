import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "../user/userRouter";

dotenv.config();

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api/users", userRouter);
  }

  public start() {
    const PORT = process.env.PORT || 3030;
    this.app.listen(PORT, () => {
      console.log(`Server running OK on Port: ${PORT}`);
    });
  }
}
