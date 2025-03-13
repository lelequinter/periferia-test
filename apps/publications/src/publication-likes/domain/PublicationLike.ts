export class PublicationLike {
  constructor (
      public id: string,
      public userId: string,
      public publicationId: string,
      public createdAt: Date,
  ){}
}