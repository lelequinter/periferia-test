import { Request, Response, NextFunction } from "express";
import { RegisterUser } from "../../application/registerUser";
import { registerErrorHandler } from "../../../middlewares/registerErrorHandler";

export class RegisterController {
  constructor(private registerUser: RegisterUser) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.registerUser.run(name, email, password);

      res.status(201).json({ message: "Usuario creado con éxito", user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
      const error = e as Error;

      registerErrorHandler(error, req, res);
    }
  }
}
