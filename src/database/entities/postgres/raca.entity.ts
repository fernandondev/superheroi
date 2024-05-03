import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'race'})
export class RacaEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'race'})
    raca: string;

}