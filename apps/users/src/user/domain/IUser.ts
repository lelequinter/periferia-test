import { User } from "./User";

export interface IUser {
    create(name: string, email: string, password: string): Promise<User>;
    find(email:string): Promise<User | null>;
}