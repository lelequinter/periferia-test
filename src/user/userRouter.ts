import { Router } from "express";
import { loginController, registerUserController } from "../server/dependencies";
import { validateDto } from "../middlewares/validateDto";
import { loginUserDTO, registerUserDto } from "./domain/userDTO";


const userRouter = Router();

userRouter.get("/test", (_, res) => { res.json({ message: "UserRouter running OK" }) });
userRouter.post("/register", validateDto(registerUserDto), registerUserController.run.bind(registerUserController));
userRouter.post("/login", validateDto(loginUserDTO), loginController.run.bind(loginController))

export default userRouter;
