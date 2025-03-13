import { IPublicationLike } from "../domain/IPublicationLike";

export class CreatePublicationLike {
    constructor(
        private publicationLikeRepository: IPublicationLike,
    ){}

    async run(publicationId: string, userId: string){
        return this.publicationLikeRepository.create(publicationId, userId);
    }
}
