import { IPublication } from "../domain/IPublication";

export class CreatePublication {
    constructor(
        private publicationRepository: IPublication,
    ){}

    async run(title: string, content: string, userId: string){
        return this.publicationRepository.create(title, content, userId);
    }
}
