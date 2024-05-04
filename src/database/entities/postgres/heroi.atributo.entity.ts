import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { SuperHeroiEntity } from './super.heroi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'hero_attribute'})
export class HeroiAtributoEntity{

    @PrimaryColumn({ type:'int8', name:'hero_id' })
    idHeroi: bigint;

    @PrimaryColumn({ type:'int8', name:'attribute_id' })
    idAtributo: bigint;

    @Column({type: 'int', name: 'attribute_value'})
    valorAtributo: number;

    @ManyToOne(() => SuperHeroiEntity, (superHeroi) => superHeroi.heroiAtributos)
    @JoinColumn({ name: 'hero_id' })
    superHeroi: SuperHeroiEntity

    @ManyToOne(() => AtributoEntity, (atributo) => atributo.heroiAtributos, {eager: true}) 
    @JoinColumn({ name: 'attribute_id' })
    atributo: AtributoEntity

}