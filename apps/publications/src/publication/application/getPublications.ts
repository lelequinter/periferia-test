import { IPublication } from "../domain/IPublication";

export class GetPublications {
    constructor(
        private publicationRepository: IPublication,
    ){}

    async run(){
        return this.publicationRepository.getAll();
    }
}
