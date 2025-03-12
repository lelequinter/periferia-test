import { IHash } from "../../services/interfaces/IHash";
import { IUser } from "../domain/IUser";

export class RegisterUser{
  constructor(
      private UserRepository: IUser,
      private hash: IHash
  ){}

  async run(name: string, email: string, password: string){
      const hashedPassword = await this.hash.hash(password);

      return await this.UserRepository.create(name, email, hashedPassword);
  }
}