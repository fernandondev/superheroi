import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'hero_attribute'})
export class HeroiAtributoEntity{

    @PrimaryColumn({ type:'int8', name:'hero_id' })
    idHeroi: bigint;

    @PrimaryColumn({ type:'int8', name:'attribute_id' })
    idAtributo: bigint;


    @Column({type: 'int', name: 'attribute_value'})
    valorAtributo: number;
}