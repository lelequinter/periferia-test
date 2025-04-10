import express, { Application } from "express";
import cors from "cors"; 
import dotenv from "dotenv";
import userRouter from "../user/userRouter";

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

    this.app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));
  }

  private routes() {
    this.app.use("/api/users", userRouter);
  }

  public start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server running OK on Port: ${PORT}`);
    });
  }
}

export const app = new Server().app;
