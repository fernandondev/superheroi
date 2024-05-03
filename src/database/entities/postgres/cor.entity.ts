import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'POSTGRES', name: 'colour'})
export class CorEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'colour'})
    cor: string;
}