import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'alignment'})
export class AlinhamentoEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'alignment'})
    alignment: string;
}