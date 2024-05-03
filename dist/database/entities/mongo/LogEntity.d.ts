import { ObjectId } from 'mongodb';
export declare class LogEntity {
    id: ObjectId;
    conteudo: string;
    level: string;
    createdAt: Date;
}
