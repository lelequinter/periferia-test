import { Router } from "express";
import { registerUserController } from "../server/dependencies";
import { validateDto } from "../middlewares/validateDto";
import { registerUserDto } from "./domain/userDTO";


const userRouter = Router();

userRouter.get("/test", (_, res) => { res.json({ message: "UserRouter running OK" }) });
userRouter.post("/register", validateDto(registerUserDto), registerUserController.run.bind(registerUserController));

export default userRouter;
