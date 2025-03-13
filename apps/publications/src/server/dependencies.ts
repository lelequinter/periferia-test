import { PublicationRepository } from '../publication/infrastructure/PublicationRepository';
import { CreatePublication } from "../publication/application/createPublication";
import { PublicationController } from "../publication/infrastructure/controllers/publicationController";
import { PublicationLikeRepository } from '../publication-likes/infraestructure/PublicationLikeRepository';
import { CreatePublicationLike } from '../publication-likes/application/createPublicationLike';
import { PublicationLikeController } from '../publication-likes/infraestructure/controllers/PublicationLikeController';
import { GetPublications } from '../publication/application/getPublications';
import { GetPublicationController } from '../publication/infrastructure/controllers/getPublicataionsController';

const publicationRepository = new PublicationRepository;

const createPublication = new CreatePublication(publicationRepository);
export const publicationController = new PublicationController(createPublication);

const getPublications = new GetPublications(publicationRepository);
export const getPublicationController = new GetPublicationController(getPublications);

const publicationLikeRepository = new PublicationLikeRepository;
const createPublicationLike = new CreatePublicationLike(publicationLikeRepository);
export const publicationLikeController = new PublicationLikeController(createPublicationLike);