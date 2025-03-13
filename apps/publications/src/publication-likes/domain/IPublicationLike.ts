import { PublicationLike } from "./PublicationLike";

export interface IPublicationLike {
    create(publicationId: string, userId: string): Promise<PublicationLike>;
    find(id: string): Promise<PublicationLike | null>;
}