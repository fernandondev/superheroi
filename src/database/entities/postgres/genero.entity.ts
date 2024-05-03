import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SuperHeroiEntity } from './super.heroi.entity';


@Entity({ database: 'POSTGRES', name: 'gender'})
export class GeneroEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'gender'})
    genero: string;

}