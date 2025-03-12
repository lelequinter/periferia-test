import { Request, Response } from "express";
import { LoginUser } from "../../application/loginUser";

export class LoginController {
  constructor(private loginUser: LoginUser) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { email: emailReq, password } = req.body;

      const {id, name, email, token} = await this.loginUser.run(emailReq, password);

      res.status(200).json({ message: "Usuario conectado", user: {id, name, email, token} });
    } catch (error) {
      const err = error as Error;

      res.status(400).json({
        message: "Error al ingresar a la aplicación",
        error: err.message,
      });
      
    }
  }
}
