import { Router } from "express";
import { publicationLikeController } from "../server/dependencies";
import { validateDto } from "../middlewares/validateDto";
import { createPublicationLikeDto } from "./domain/publicationLikeDTO";
import { verifyToken } from "../middlewares/authMiddleware";

const publicationLikesRouter = Router();

publicationLikesRouter.get("/test", (_, res) => { res.json({ message: "publicationLikesRouter running OK" }) });
publicationLikesRouter.post("/", verifyToken,validateDto(createPublicationLikeDto), publicationLikeController.run.bind(publicationLikeController));

export default publicationLikesRouter;