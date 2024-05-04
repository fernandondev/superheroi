import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { SuperHeroiEntity } from './super.heroi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'hero_attribute'})
export class HeroiAtributoEntity{

    @Column({ type:'int8', name:'hero_id' })
    idHeroi: bigint;

    @Column({ type:'int8', name:'attribute_id' })
    idAtributo: bigint;

    @Column({type: 'int', name: 'attribute_value'})
    valorAtributo: number;

    @ManyToOne(() => SuperHeroiEntity, (superHeroi) => superHeroi.heroiAtributo)
    superHeroi: SuperHeroiEntity

    @ManyToOne(() => AtributoEntity, (atributo) => atributo.heroiAtributo)
    atributo: AtributoEntity

}