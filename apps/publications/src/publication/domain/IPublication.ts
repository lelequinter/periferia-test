import { Publication } from "./Publication";

export interface IPublication {
    create(title: string, content: string, userId: string): Promise<Publication>;
    getAll(): Promise<Publication[]>
}