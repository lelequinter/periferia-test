import { PrismaClient } from "@prisma/client";
import { IPublicationLike } from "../domain/IPublicationLike";
import { PublicationLike } from "../domain/PublicationLike";


export class PublicationLikeRepository implements IPublicationLike {
    private db: PrismaClient;

    constructor(){
        this.db = new PrismaClient();
    }

    async create(publicationId: string, userId: string): Promise<PublicationLike> {
        const publication = await this.db.publicationLikes.create({
            data: {
                publicationId,
                userId
            }
        });

        return new PublicationLike(publication.id, publication.userId, publication.publicationId, publication.createdAt);
    }

    async find(id: string): Promise<PublicationLike | null> { 
        const publication = await this.db.publicationLikes.findUnique({
            where: {
                id
            }
        });

        if(!publication){
            return null;
        }

        return new PublicationLike(publication.id, publication.userId, publication.publicationId, publication.createdAt);
    }
}