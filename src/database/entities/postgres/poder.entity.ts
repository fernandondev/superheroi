import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { SuperHeroiEntity } from './super.heroi.entity';
import { HeroiPoderEntity } from './heroi.poder.entity';


@Entity({ database: 'POSTGRES', name: 'superpower'})
export class PoderEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'power_name'})
    nomePoder: string;

    @OneToMany(() => HeroiPoderEntity, heroiPoder => heroiPoder.poder)
    heroiPoderes: HeroiPoderEntity[];

}