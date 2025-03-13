import { PrismaClient } from "@prisma/client";
import { IPublication } from "../domain/IPublication";
import { Publication } from "../domain/Publication";

export class PublicationRepository implements IPublication {
    private db: PrismaClient;

    constructor(){
        this.db = new PrismaClient();
    }

    async create(title: string, content: string, userId: string): Promise<Publication> {
        const publication = await this.db.publication.create({
            data: {
                title,
                content,
                userId
            }
        });

        return new Publication(publication.id, publication.userId, publication.title, publication.content, []);
    }

    async getAll(): Promise<Publication[]> {
        console.log('getAll');
        
        const publications = await this.db.publication.findMany({
            include: {
                likes: true,
            },
        });

        return publications.map( (item) => new Publication(item.id, item.userId, item.title, item.content, item.likes) );
    }
}