import { Request, Response } from "express";
import { RegisterUser } from "../../application/registerUser";

export class RegisterController {
  constructor(
    private registerUser: RegisterUser,
  ) {}

  public async run(req: Request, res: Response): Promise<void>{
    try {
      const {name, email, password} = req.body;

      const user = await this.registerUser.run(name, email, password)

      res.status(201).json({ message: "Usuario creado con éxito", user });
    } catch (e) {
      const error = e as Error;

      res.status(400).json({ message: "Error al registrar usuario", error });
    }
  }
}