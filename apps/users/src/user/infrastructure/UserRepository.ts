import type { IUser } from "../domain/IUser";
import { User } from "../domain/User";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUser {
    private db: PrismaClient;

    constructor(){
        this.db = new PrismaClient();
    }

    async create(name: string, email: string, password: string): Promise<User> {
        const user = await this.db.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return new User(user.id, user.name, user.email, user.password);
    }

    async find(email: string){
        const user = await this.db.user.findUnique({
            where: {
                email
            }
        });

        if(!user){
            return null;
        }

        return new User(user.id, user.name, user.email, user.password);
    }
}