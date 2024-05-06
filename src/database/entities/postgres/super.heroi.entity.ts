import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { GeneroEntity } from './genero.entity';
import { CorEntity } from './cor.entity';
import { RacaEntity } from './raca.entity';
import { EditoraEntity } from './editora.entity';
import { AlinhamentoEntity } from './alinhamento.entity';
import { AtributoEntity } from './atributo.entity';
import { PoderEntity } from './poder.entity';
import { NextVal, EntityWithSequence } from 'typeorm-sequence'
import { HeroiPoderEntity } from './heroi.poder.entity';


@Entity({ database: 'POSTGRES', name: 'superhero'})
export class SuperHeroiEntity{

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'superhero_name'})
    nomeSuperHeroi: string;

    @Column({type: 'varchar', name: 'full_name'})
    nomeCompleto: string;

    @OneToOne(() => GeneroEntity,  { eager: true })
    @JoinColumn({ name: 'gender_id' })
    genero: GeneroEntity;

    @OneToOne(() => CorEntity,  { eager: true })
    @JoinColumn({ name: 'eye_colour_id' })
    corDoOlho: CorEntity;

    @OneToOne(() => CorEntity,  { eager: true })
    @JoinColumn({ name: 'hair_colour_id' })
    corDoCabelo: CorEntity;

    @OneToOne(() => CorEntity,  { eager: true })
    @JoinColumn({ name: 'skin_colour_id' })
    corDaPele: CorEntity;

    @OneToOne(() => RacaEntity,  { eager: true })
    @JoinColumn({ name: 'race_id' })
    raca: RacaEntity;

    @OneToOne(() => EditoraEntity,  { eager: true })
    @JoinColumn({ name: 'publisher_id' })
    editora: EditoraEntity;

    @OneToOne(() => AlinhamentoEntity,  { eager: true })
    @JoinColumn({ name: 'alignment_id' })
    alinhamento: AlinhamentoEntity;

    @Column({type: 'int', name: 'height_cm'})
    altura: number;

    @Column({type: 'int', name: 'weight_kg'})
    peso: number;

    @OneToMany(() => HeroiAtributoEntity, heroiAtributo => heroiAtributo.superHeroi, {eager: true})
    heroiAtributos: HeroiAtributoEntity[];

    @OneToMany(() => HeroiPoderEntity, heroiPoder => heroiPoder.superHeroi, {eager: true})
    heroiPoderes: HeroiPoderEntity[];

}