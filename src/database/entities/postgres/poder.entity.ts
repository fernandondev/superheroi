import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'superpower'})
export class PoderEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'power_name'})
    nomePoder: string;

}