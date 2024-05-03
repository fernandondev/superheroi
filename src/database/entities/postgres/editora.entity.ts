import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'publisher'})
export class EditoraEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'publisher_name'})
    editora: string;
}