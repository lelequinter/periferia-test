import { Router } from "express";
import { getPublicationController, publicationController } from "../server/dependencies";
import { validateDto } from "../middlewares/validateDto";
import {createPublicationDto} from "./domain/publicationDTO";
import { verifyToken } from "../middlewares/authMiddleware";


const publicationsRouter = Router();

publicationsRouter.get("/test", (_, res) => { res.json({ message: "publicationsRouter running OK" }) });
publicationsRouter.post("/", verifyToken, validateDto(createPublicationDto), publicationController.run.bind(publicationController));
publicationsRouter.get("/", verifyToken, getPublicationController.run.bind(getPublicationController))

export default publicationsRouter;
