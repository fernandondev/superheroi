import { ObjectId } from 'mongodb';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';


@Entity({database: 'MONGO_DB', name: 'log'})
export class LogEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  conteudo: string;

  @Column()
  level: string;

  @CreateDateColumn({name:'createdAt'})
  createdAt: Date;

}