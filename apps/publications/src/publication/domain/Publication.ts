import { PublicationLike } from "../../publication-likes/domain/PublicationLike";

export class Publication {
  constructor (
      public id: string,
      public userId: string,
      public title: string,
      public content: string,
      public like: PublicationLike[],
  ){}
}