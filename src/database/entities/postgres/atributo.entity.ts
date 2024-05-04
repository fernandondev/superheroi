import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'attribute'})
export class AtributoEntity {

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'attribute_name'})
    nomeAtributo: string;

    @OneToMany(() => HeroiAtributoEntity, heroiAtributo => heroiAtributo.atributo)
    heroiAtributo: HeroiAtributoEntity[];

}